import { RESERVATION_START_HOURS } from "@/lib/constants";
import { bookingService } from "@/lib/services/bookingService";
import { calendarService } from "@/lib/services/calendarService";
import { supabase } from "@/lib/supabase/client";
import { ClosedHour, Reservation } from "@/types";
import { addDays, format } from "date-fns";
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
  const [closedHours, setClosedHours] = useState<ClosedHour[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch reservations + closed hours together on day/field change
  useEffect(() => {
    if (!fieldId || !selectedDay) return;
    setIsFetching(true);
    Promise.all([
      bookingService.fetchReservationsForDay(fieldId, selectedDay),
      calendarService.fetchClosedHoursForDay(fieldId, selectedDay),
    ])
      .then(([res, closed]) => {
        setReservations(res);
        setClosedHours(closed);
      })
      .catch((err) => {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Bir hata oluştu");
      })
      .finally(() => setIsFetching(false));
  }, [selectedDay, fieldId]);

  const reservationsRef = useRef(reservations);
  reservationsRef.current = reservations;

  const selectedDayStrRef = useRef(format(selectedDay, "yyyy-MM-dd"));
  selectedDayStrRef.current = format(selectedDay, "yyyy-MM-dd");

  // Real-time: reservations
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

  // Real-time: closed hours — only apply changes that match the currently viewed day
  useEffect(() => {
    if (!fieldId) return;

    const channel = supabase
      .channel(`booking:closed_hours:${fieldId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "closed_hours",
          filter: `field_id=eq.${fieldId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const incoming = payload.new as ClosedHour;
            if (incoming.closed_date !== selectedDayStrRef.current) return;
            setClosedHours((prev) => {
              if (prev.some((c) => c.id === incoming.id)) return prev;
              return [...prev, incoming];
            });
          } else if (payload.eventType === "DELETE") {
            setClosedHours((prev) =>
              prev.filter((c) => c.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fieldId]);

  const isHourClosed = (hour: number) =>
    closedHours.some((c) => c.hour === hour);

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
    isHourClosed,
  };
}
