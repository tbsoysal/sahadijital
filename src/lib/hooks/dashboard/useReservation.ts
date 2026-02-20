import { supabase } from "@/lib/supabase/client";
import { endOfDay, isSameDay, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export type Reservation = {
  id: string;
  customer_name: string;
  customer_phone: string;
  start_time: string;
  end_time: string;
  field_id: string;
  price: number;
  status: string;
};

export function useReservations(startDate: Date, endDate: Date) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);

      // Get current user and business_id
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from("users")
        .select("business_id")
        .eq("auth_id", user.id)
        .single();

      if (!userData?.business_id) return;

      // Fetch reservations for the date range
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("business_id", userData.business_id)
        .gte("start_time", startDate.toISOString())
        .lte("start_time", endOfDay(endDate).toISOString())
        .order("start_time");

      if (!error && data) {
        setReservations(data);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [startDate, endDate, refreshKey]);

  // Helper function to get reservation for a specific day and hour
  const getReservationForSlot = (day: Date, hour: number) => {
    return reservations.filter((reservation) => {
      const startTime = parseISO(reservation.start_time);
      const reservationHour = startTime.getHours();
      const reservationDay = startTime;

      return isSameDay(reservationDay, day) && reservationHour === hour;
    });
  };
  return {
    reservations,
    loading,
    getReservationForSlot,
    refresh: () => setRefreshKey((prev) => prev + 1),
  };
}
