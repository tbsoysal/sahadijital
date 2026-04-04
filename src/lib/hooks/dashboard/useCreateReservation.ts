import { useDashboardContext } from "@/context/DashboardContext";
import { calendarService } from "@/lib/services/calendarService";
import { ReservationFormData } from "@/lib/schemas/reservationSchema";
import { Reservation } from "@/types";
import { format } from "date-fns";
import { useState } from "react";

export function useCreateReservation(onSuccess: (reservation: Reservation) => void) {
  const { selectedField } = useDashboardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (data: ReservationFormData & { date: Date }) => {
    if (!selectedField) {
      setError("Saha seçilmedi.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newReservation = await calendarService.createReservation({
        field_id: selectedField.id,
        reservation_date: format(data.date, "yyyy-MM-dd"),
        start_time: `${String(data.startTime).padStart(2, "0")}:00:00`,
        end_time: `${String(data.endTime).padStart(2, "0")}:00:00`,
        customer_name: data.customerName,
        customer_phone: data.phone,
        price: parseFloat(data.price),
        is_paid: data.isPaid,
        description: data.description,
        status: "confirmed",
      });

      onSuccess(newReservation);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "23P01") {
        setError("Bu saatte zaten bir rezervasyon mevcut.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : (err as { message?: string }).message ?? "Bir hata oluştu.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createReservation, isLoading, error, clearError: () => setError(null) };
}
