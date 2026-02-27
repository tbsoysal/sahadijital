import { useMemo, useState } from "react";
import { addDays, addWeeks, startOfWeek, subWeeks } from "date-fns";
import { SelectedSlot } from "./types";

export function useCalendar() {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const hours = Array.from({ length: 15 }, (_, i) => (i + 12) % 24); // [12, 13, 14, ..., 23, 0, 1, 2]
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(null);

  const nextWeek = () => setReferenceDate((prev) => addWeeks(prev, 1));
  const prevWeek = () => setReferenceDate((prev) => subWeeks(prev, 1));
  const goToToday = () => setReferenceDate(new Date());

  const weekStart = useMemo(() => {
    return startOfWeek(referenceDate, { weekStartsOn: 1 });
  }, [referenceDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  }, [weekStart]);

  return {
    currentDate: referenceDate,
    weekStart,
    weekDays,
    selectedSlot,
    setSelectedSlot,
    hours,
    nextWeek,
    prevWeek,
    goToToday
  };
}
