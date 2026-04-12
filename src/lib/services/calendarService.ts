import { supabase } from "@/lib/supabase/client";
import { ClosedHour } from "@/types";
import { format } from "date-fns";

export const calendarService = {
  fetchFields: async (userId: string) => {
    const { data: fields, error } = await supabase
      .from("fields")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return fields;
  },

  fetchReservationsForWeek: async (fieldId: string, start: Date, end: Date) => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("field_id", fieldId)
      .gte("reservation_date", format(start, "yyyy-MM-dd"))
      .lte("reservation_date", format(end, "yyyy-MM-dd"));

    if (error) throw error;
    return data;
  },

  createReservation: async (payload: {
    field_id: string;
    customer_name: string;
    customer_phone: string;
    reservation_date: string;
    start_time: string;
    end_time: string;
    price: number;
    is_paid: boolean;
    description?: string;
    status: "confirmed" | "pending" | "rejected";
  }) => {
    const { data, error } = await supabase
      .from("reservations")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  },

  updateReservation: async (
    id: string,
    payload: {
      customer_name: string;
      customer_phone: string;
      reservation_date: string;
      start_time: string;
      end_time: string;
      price: number;
      is_paid: boolean;
      description?: string;
    },
  ) => {
    const { data, error } = await supabase
      .from("reservations")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateReservationStatus: async (
    id: string,
    status: "confirmed" | "pending" | "rejected",
  ) => {
    const { data, error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteReservation: async (id: string): Promise<void> => {
    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) throw error;
  },

  fetchMonthlyReservations: async (
    fieldId: string,
    year: number,
    month: number,
  ) => {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("field_id", fieldId)
      .gte("reservation_date", format(start, "yyyy-MM-dd"))
      .lte("reservation_date", format(end, "yyyy-MM-dd"));

    if (error) throw error;
    return data;
  },

  addField: async (userId: string, name: string) => {
    const { data, error } = await supabase
      .from("fields")
      .insert({ user_id: userId, name })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  renameField: async (fieldId: string, name: string) => {
    const { error } = await supabase
      .from("fields")
      .update({ name })
      .eq("id", fieldId);

    if (error) throw error;
  },

  updateFieldPrice: async (fieldId: string, price: number) => {
    const { error } = await supabase
      .from("fields")
      .update({ default_price: price })
      .eq("id", fieldId);

    if (error) throw error;
  },

  deleteField: async (fieldId: string) => {
    const { error } = await supabase.from("fields").delete().eq("id", fieldId);

    if (error) throw error;
  },

  fetchClosedHoursForWeek: async (
    fieldId: string,
    start: Date,
    end: Date,
  ): Promise<ClosedHour[]> => {
    const { data, error } = await supabase
      .from("closed_hours")
      .select("*")
      .eq("field_id", fieldId)
      .gte("closed_date", format(start, "yyyy-MM-dd"))
      .lte("closed_date", format(end, "yyyy-MM-dd"));

    if (error) throw error;
    return data;
  },

  fetchClosedHoursForDay: async (
    fieldId: string,
    date: Date,
  ): Promise<ClosedHour[]> => {
    const { data, error } = await supabase
      .from("closed_hours")
      .select("*")
      .eq("field_id", fieldId)
      .eq("closed_date", format(date, "yyyy-MM-dd"));

    if (error) throw error;
    return data;
  },

  closeHour: async (
    fieldId: string,
    date: Date,
    hour: number,
  ): Promise<ClosedHour> => {
    const { data, error } = await supabase
      .from("closed_hours")
      .insert({
        field_id: fieldId,
        closed_date: format(date, "yyyy-MM-dd"),
        hour,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  openHour: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("closed_hours")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  updateFieldHours: async (
    fieldId: string,
    startHour: number,
    endHour: number,
  ): Promise<void> => {
    // Build the set of valid start-hour values for the new range
    const validHours = new Set<number>();
    let h = startHour;
    while (h !== endHour) {
      validHours.add(h);
      h = (h + 1) % 24;
    }

    // Fetch all closed hours for this field
    const { data: allClosed, error: fetchError } = await supabase
      .from("closed_hours")
      .select("id, hour")
      .eq("field_id", fieldId);

    if (fetchError) throw fetchError;

    // Delete rows whose hour falls outside the new range
    const idsToDelete = (allClosed ?? [])
      .filter((row) => !validHours.has(row.hour))
      .map((row) => row.id);

    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("closed_hours")
        .delete()
        .in("id", idsToDelete);

      if (deleteError) throw deleteError;
    }

    // Update the field's operating hours
    const { error: updateError } = await supabase
      .from("fields")
      .update({ start_hour: startHour, end_hour: endHour })
      .eq("id", fieldId);

    if (updateError) throw updateError;
  },
};
