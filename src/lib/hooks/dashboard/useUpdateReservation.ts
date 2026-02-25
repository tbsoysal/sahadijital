import { supabase } from "@/lib/supabase/client";
import { ReservationFormData } from "./types";

export function useUpdateReservation() {
  const updateReservation = async (id: string, updatedData: ReservationFormData) => {
    const { data, error } = await supabase
      .from("reservations")
      .update({
        customer_name: updatedData.customerName,
        customer_phone: updatedData.customerPhone,
        price: updatedData.price,
        payment_status: updatedData.paymentStatus,
        note: updatedData.note,
      })
      .eq('id', id)
      .select();

    return { success: !error, error, data };
  };

  return { updateReservation };
}
