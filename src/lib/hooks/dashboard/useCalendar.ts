import { useState } from "react";
import { addDays, startOfWeek } from "date-fns";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i),
  );

  return {
    currentDate,
    weekStart,
    weekDays,
  };
}
