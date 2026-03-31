import { bookingService } from "@/lib/services/bookingService";
import { Reservation } from "@/types";
import { useState } from "react";

export function useSubmitRequest(
  onSuccess: (newReservation: Reservation) => void,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRequest = async (payload: {
    field_id: string;
    customer_name: string;
    customer_phone: string;
    reservation_date: string;
    start_time: string;
    end_time: string;
    description?: string;
    price: number;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const newReservation = await bookingService.submitRequest(payload);
      onSuccess(newReservation);
    } catch (err: unknown) {
      const e = err as { code?: string };
      if (e?.code === "23P01") {
        setError("Bu saat dolu, lütfen başka bir saat seçin.");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submitRequest, isLoading, error };
}
