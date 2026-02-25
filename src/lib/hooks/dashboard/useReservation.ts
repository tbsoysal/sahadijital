import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { endOfDay, isSameDay, parseISO, startOfDay } from "date-fns";
import { useUserBusiness } from "@/lib/hooks/dashboard/useUserBusiness";

export function useReservation(startDate: Date, endDate: Date) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { userBusiness } = useUserBusiness();

  // Convert dates to strings for the dependency array
  // This prevents re-fetching if the Date object changes but the day stays the same
  const startStr = startDate?.toISOString();
  const endStr = endDate?.toISOString();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!userBusiness?.businessId || !startStr || !endStr) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      console.count("🚀 Supabase API Call Get Reservations");
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("business_id", userBusiness.businessId)
        .gte("start_time", startOfDay(parseISO(startStr)).toISOString())
        .lte("start_time", endOfDay(parseISO(endStr)).toISOString())
        .order("start_time");

      if (!error && data) {
        setReservations(data);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [startStr, endStr, refreshKey, userBusiness?.businessId]);

  const getReservationForSlot = useCallback((day: Date, hour: number) => {
    return reservations.filter((res) => {
      const resDate = parseISO(res.start_time);
      return isSameDay(resDate, day) && resDate.getHours() === hour;
    });
  }, [reservations]); // Only changes when data actually arrives

  return {
    reservations,
    loading,
    getReservationForSlot,
    refresh: () => setRefreshKey((prev) => prev + 1),
  };
}
