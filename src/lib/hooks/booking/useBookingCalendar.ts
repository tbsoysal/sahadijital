import { WORKING_HOURS } from "@/lib/constants";
import { bookingService } from "@/lib/services/bookingService";
import { Reservation } from "@/types";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";

export function useBookingCalendar(fieldId: string) {
  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  const [selectedDay, setSelectedDay] = useState<Date>(days[0]);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservations() {
      if (!fieldId || !selectedDay) return;
      setIsFetching(true);
      try {
        const reservationsData = await bookingService.fetchReservationsForDay(
          fieldId,
          selectedDay,
        );
        setReservations(reservationsData);
      } catch (err) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Bir hata oluştu");
      } finally {
        setIsFetching(false);
      }
    }

    fetchReservations();
  }, [selectedDay, fieldId]);

  return {
    days,
    hours: WORKING_HOURS,
    selectedDay,
    setSelectedDay,
    reservations,
    isFetching,
    selectedHour,
    setSelectedHour,
    errorMessage,
    setErrorMessage,
  };
}
