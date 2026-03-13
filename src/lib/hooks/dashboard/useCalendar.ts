import { addDays, addWeeks, startOfWeek, subWeeks } from "date-fns";
import { useState } from "react";
import { Slot } from "../types";

export function useCalendar() {
  const [referenceDay, setReferenceDay] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const startDayOfWeek = startOfWeek(referenceDay, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    return addDays(startDayOfWeek, i);
  });
  const hours = Array.from({ length: 14 }, (_, i) => {
    return (12 + i) % 24;
  });

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
  };
}
