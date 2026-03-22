import { supabase } from "@/lib/supabase/client";
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

  deleteField: async (fieldId: string) => {
    const { error } = await supabase.from("fields").delete().eq("id", fieldId);

    if (error) throw error;
  },
};
