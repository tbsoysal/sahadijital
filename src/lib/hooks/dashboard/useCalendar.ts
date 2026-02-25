import { useMemo, useState } from "react";
import { addDays, startOfWeek } from "date-fns";

export function useCalendar() {
  // 1. Keep the "reference date" in state so it stays stable 
  // until you explicitly want to change weeks.
  const [referenceDate] = useState(new Date());

  // 2. Memoize the start of the week based on that stable state
  const weekStart = useMemo(() => {
    return startOfWeek(referenceDate, { weekStartsOn: 1 });
  }, [referenceDate]);

  // 3. Generate the array of days
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  }, [weekStart]);

  return {
    currentDate: referenceDate,
    weekStart,
    weekDays,
  };
}
