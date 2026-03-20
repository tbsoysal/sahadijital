import { useDashboardContext } from "@/context/DashboardContext";
import { calendarService } from "@/lib/services/calendarService";
import { Reservation } from "@/types";
import { useEffect, useState } from "react";

export function useStats() {
  const { selectedField } = useDashboardContext();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedField) return;

    const fetchStats = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const now = new Date();
        const data = await calendarService.fetchMonthlyReservations(
          selectedField.id,
          now.getFullYear(),
          now.getMonth() + 1,
        );
        setReservations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [selectedField]);

  const total = reservations.length;
  const paid = reservations.filter((r) => r.is_paid).length;
  const unpaid = total - paid;
  const revenue = reservations
    .filter((r) => r.is_paid)
    .reduce((sum, r) => sum + r.price, 0);

  return { total, paid, unpaid, revenue, isLoading, error };
}
