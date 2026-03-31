import { supabase } from "@/lib/supabase/client";
import { Reservation } from "@/types";
import { format } from "date-fns";

export const bookingService = {
  fetchReservationsForDay: async (
    fieldId: string,
    day: Date,
  ): Promise<Reservation[]> => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("field_id", fieldId)
      .eq("reservation_date", format(day, "yyyy-MM-dd"))
      .neq("status", "rejected");

    if (error) throw error;

    return data;
  },

  submitRequest: async (payload: {
    field_id: string;
    customer_name: string;
    customer_phone: string;
    reservation_date: string;
    start_time: string;
    end_time: string;
    description?: string;
    price: number;
  }) => {
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        ...payload,
        status: "pending",
        is_paid: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
