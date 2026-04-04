import { RESERVATION_START_HOURS } from "@/lib/constants";
import { bookingService } from "@/lib/services/bookingService";
import { supabase } from "@/lib/supabase/client";
import { Reservation } from "@/types";
import { addDays } from "date-fns";
import { useEffect, useRef, useState } from "react";

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

  const reservationsRef = useRef(reservations);
  reservationsRef.current = reservations;

  useEffect(() => {
    if (!fieldId) return;

    const channel = supabase
      .channel(`booking:reservations:${fieldId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reservations",
          filter: `field_id=eq.${fieldId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const incoming = payload.new as Reservation;
            const alreadyExists = reservationsRef.current?.some(
              (r) => r.id === incoming.id,
            );
            if (!alreadyExists) {
              setReservations((prev) => [...(prev ?? []), incoming]);
            }
          } else if (payload.eventType === "UPDATE") {
            setReservations((prev) =>
              (prev ?? []).map((r) =>
                r.id === payload.new.id ? (payload.new as Reservation) : r,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setReservations((prev) =>
              (prev ?? []).filter((r) => r.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fieldId]);

  return {
    days,
    hours: RESERVATION_START_HOURS,
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
