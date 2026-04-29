import { dbTimeToMinutes } from "@/lib/constants";
import { supabase } from "@/lib/supabase/client";
import { Subscription } from "@/types";
import { format } from "date-fns";

// Returns all dates from today to endDateStr (inclusive) that fall on dayOfWeek.
// dayOfWeek follows JS convention: 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
function getOccurrenceDates(dayOfWeek: number, endDateStr: string): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const current = new Date(today);
  const daysUntil = (dayOfWeek - current.getDay() + 7) % 7;
  current.setDate(current.getDate() + daysUntil);

  while (format(current, "yyyy-MM-dd") <= endDateStr) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }

  return dates;
}

export const subscriptionService = {
  fetchSubscriptions: async (fieldId: string): Promise<Subscription[]> => {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("field_id", fieldId)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Returns an array of reservation_date strings that would conflict.
  checkConflicts: async (
    fieldId: string,
    dayOfWeek: number,
    startTimeStr: string, // HH:MM:SS
    endTimeStr: string,   // HH:MM:SS
    endDate: string,      // yyyy-MM-dd
  ): Promise<string[]> => {
    const dates = getOccurrenceDates(dayOfWeek, endDate);
    if (dates.length === 0) return [];

    const dateStrings = dates.map((d) => format(d, "yyyy-MM-dd"));

    const { data, error } = await supabase
      .from("reservations")
      .select("reservation_date, start_time, end_time")
      .eq("field_id", fieldId)
      .in("reservation_date", dateStrings)
      .neq("status", "rejected");

    if (error) throw error;

    // Minute-based overlap — three-way check covers all cross-midnight combinations:
    // 1. both on the same linear segment
    // 2. new booking is post-midnight relative to the existing one (+1440 to new)
    // 3. existing reservation is post-midnight relative to the new one (+1440 to existing)
    const newStart = dbTimeToMinutes(startTimeStr);
    const rawNewEnd = dbTimeToMinutes(endTimeStr);
    const newEnd = rawNewEnd <= newStart ? rawNewEnd + 1440 : rawNewEnd;

    const conflictingDates = (data ?? [])
      .filter((r) => {
        const rStart = dbTimeToMinutes(r.start_time);
        const rawREnd = dbTimeToMinutes(r.end_time);
        const rEnd = rawREnd <= rStart ? rawREnd + 1440 : rawREnd;
        return (rStart < newEnd          && rEnd          > newStart) ||
               (rStart < newEnd + 1440   && rEnd          > newStart + 1440) ||
               (rStart + 1440 < newEnd   && rEnd + 1440   > newStart);
      })
      .map((r) => r.reservation_date as string);

    return [...new Set(conflictingDates)];
  },

  createSubscriptionWithReservations: async (payload: {
    field_id: string;
    customer_name: string;
    customer_phone: string;
    day_of_week: number;
    start_time: string; // HH:MM:SS
    end_time: string;   // HH:MM:SS
    price_per_session: number;
    description?: string;
  }): Promise<{ subscription: Subscription; conflicts: string[] }> => {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const end_date = format(oneYearFromNow, "yyyy-MM-dd");

    // 1. Check conflicts first — no writes if there are any
    const conflicts = await subscriptionService.checkConflicts(
      payload.field_id,
      payload.day_of_week,
      payload.start_time,
      payload.end_time,
      end_date,
    );

    if (conflicts.length > 0) {
      return { subscription: null as unknown as Subscription, conflicts };
    }

    // 2. Create the subscription row
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .insert({
        field_id: payload.field_id,
        customer_name: payload.customer_name,
        customer_phone: payload.customer_phone,
        day_of_week: payload.day_of_week,
        start_time: payload.start_time,
        end_time: payload.end_time,
        price_per_session: payload.price_per_session,
        description: payload.description,
        end_date,
        status: "active",
      })
      .select()
      .single();

    if (subError) throw subError;

    // 3. Generate occurrence dates and bulk-insert reservations
    const dates = getOccurrenceDates(payload.day_of_week, end_date);

    if (dates.length > 0) {
      const reservationRows = dates.map((date) => ({
        field_id: payload.field_id,
        customer_name: payload.customer_name,
        customer_phone: payload.customer_phone,
        reservation_date: format(date, "yyyy-MM-dd"),
        start_time: payload.start_time,
        end_time: payload.end_time,
        price: payload.price_per_session,
        is_paid: false,
        description: payload.description,
        status: "confirmed" as const,
        subscription_id: subscription.id,
      }));

      const { error: resError } = await supabase
        .from("reservations")
        .insert(reservationRows);

      if (resError) {
        // Roll back the subscription row if bulk insert fails
        await supabase.from("subscriptions").delete().eq("id", subscription.id);
        throw resError;
      }
    }

    return { subscription, conflicts: [] };
  },

  cancelSubscription: async (id: string, cutoffDate: string): Promise<void> => {
    // Delete all reservations after the cutoff date (exclusive — keeps the cutoff week)
    const { error: deleteError } = await supabase
      .from("reservations")
      .delete()
      .eq("subscription_id", id)
      .gt("reservation_date", cutoffDate);

    if (deleteError) throw deleteError;

    // Mark the subscription itself as cancelled
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (updateError) throw updateError;
  },
};
