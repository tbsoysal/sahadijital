import { useDashboardContext } from "@/context/DashboardContext";
import { WORKING_HOURS } from "@/lib/constants";
import { calendarService } from "@/lib/services/calendarService";
import { Reservation, Slot } from "@/types";
import { addDays, addWeeks, startOfWeek, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import { useCreateReservation } from "./useCreateReservation";

export function useCalendar() {
  const { selectedField } = useDashboardContext();
  const [referenceDay, setReferenceDay] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { createReservation, isLoading, error } = useCreateReservation(
    (newReservation) => {
      setReservations((prev) => [...prev, newReservation]);
      setSelectedSlot(null);
    },
  );

  const startDayOfWeek = startOfWeek(referenceDay, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    return addDays(startDayOfWeek, i);
  });
  const hours = WORKING_HOURS;

  useEffect(() => {
    if (!selectedField) return;
    const start = startOfWeek(referenceDay, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    calendarService
      .fetchReservationsForWeek(selectedField.id, start, end)
      .then(setReservations);
  }, [referenceDay, selectedField]);

  const nextWeek = () => setReferenceDay((prev) => addWeeks(prev, 1));
  const prevWeek = () => setReferenceDay((prev) => subWeeks(prev, 1));

  return {
    setReferenceDay,
    weekDays,
    hours,
    selectedSlot,
    setSelectedSlot,
    nextWeek,
    prevWeek,
    reservations,
    createReservation,
    isLoading,
    error,
  };
}
