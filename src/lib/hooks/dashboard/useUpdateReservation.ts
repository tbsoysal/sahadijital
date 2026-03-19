import { calendarService } from "@/lib/services/calendarService";
import { ReservationFormData } from "@/lib/schemas/reservationSchema";
import { Reservation } from "@/types";
import { format } from "date-fns";
import { useState } from "react";

export function useUpdateReservation(onSuccess: (updated: Reservation) => void) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateReservation = async (
    id: string,
    data: ReservationFormData & { date: Date },
  ) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const updated = await calendarService.updateReservation(id, {
        reservation_date: format(data.date, "yyyy-MM-dd"),
        start_time: `${String(data.startTime).padStart(2, "0")}:00:00`,
        end_time: `${String(data.endTime).padStart(2, "0")}:00:00`,
        customer_name: data.customerName,
        customer_phone: data.phone,
        price: parseFloat(data.price),
        is_paid: data.isPaid,
        description: data.description,
      });

      onSuccess(updated);
    } catch (err) {
      setUpdateError(
        err instanceof Error
          ? err.message
          : (err as { message?: string }).message ?? "Bir hata oluştu.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateReservation, isUpdating, updateError, clearUpdateError: () => setUpdateError(null) };
}
