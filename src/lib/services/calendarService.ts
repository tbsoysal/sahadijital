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
      console.error("createReservation error:", error);
      throw error;
    }
    return data;
  },
};
