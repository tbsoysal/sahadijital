import { useDashboardContext } from "@/context/DashboardContext";
import { generateFieldHours } from "@/lib/constants";
import { calendarService } from "@/lib/services/calendarService";
import { supabase } from "@/lib/supabase/client";
import { ClosedHour, Reservation, Slot } from "@/types";
import { addDays, addWeeks, format, startOfWeek, subWeeks } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useCreateReservation } from "./useCreateReservation";
import { useDeleteReservation } from "./useDeleteReservation";
import { useUpdateReservation } from "./useUpdateReservation";

export function useCalendar() {
  const { selectedField } = useDashboardContext();
  const [referenceDay, setReferenceDay] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [closedHours, setClosedHours] = useState<ClosedHour[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const { createReservation, isLoading, error, clearError } =
    useCreateReservation((newReservation) => {
      setReservations((prev) => [...prev, newReservation]);
      setSelectedSlot(null);
    });
  const { updateReservation, isUpdating, updateError, clearUpdateError } =
    useUpdateReservation((updated) => {
      setReservations((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      );
      setSelectedSlot(null);
    });
  const { deleteReservation, isDeleting, deleteError, clearDeleteError } =
    useDeleteReservation((id) => {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      setSelectedSlot(null);
    });

  const [isApprovingId, setIsApprovingId] = useState<string | null>(null);
  const [isRejectingId, setIsRejectingId] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const approveReservation = async (id: string) => {
    setIsApprovingId(id);
    setStatusError(null);
    try {
      const updated = await calendarService.updateReservationStatus(
        id,
        "confirmed",
      );
      setReservations((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      );
      setSelectedSlot(null);
    } catch {
      setStatusError("Onaylama sırasında hata oluştu.");
    } finally {
      setIsApprovingId(null);
    }
  };

  const rejectReservation = async (id: string) => {
    setIsRejectingId(id);
    setStatusError(null);
    try {
      await calendarService.deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
      setSelectedSlot(null);
    } catch {
      setStatusError("Reddetme sırasında hata oluştu.");
    } finally {
      setIsRejectingId(null);
    }
  };

  const closeMenu = () => {
    setSelectedSlot(null);
    clearError();
    clearUpdateError();
    clearDeleteError();
    setStatusError(null);
  };

  const startDayOfWeek = startOfWeek(referenceDay, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    return addDays(startDayOfWeek, i);
  });
  const { workingHours, reservationStartHours, workingEndHours } =
    generateFieldHours(selectedField?.start_hour ?? 11, selectedField?.end_hour ?? 0);
  const hours = workingHours;

  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    if (!selectedField) return;
    const start = startOfWeek(referenceDay, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    setIsFetching(true);
    Promise.all([
      calendarService.fetchReservationsForWeek(selectedField.id, start, end),
      calendarService.fetchClosedHoursForWeek(selectedField.id, start, end),
    ])
      .then(([res, closed]) => {
        setReservations(res);
        setClosedHours(closed);
      })
      .finally(() => setIsFetching(false));
  }, [referenceDay, selectedField, refetchKey]);

  const reservationsRef = useRef(reservations);
  reservationsRef.current = reservations;

  useEffect(() => {
    if (!selectedField) return;

    const channel = supabase
      .channel(`dashboard:reservations:${selectedField.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reservations",
          filter: `field_id=eq.${selectedField.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const incoming = payload.new as Reservation;
            const alreadyExists = reservationsRef.current.some(
              (r) => r.id === incoming.id,
            );
            if (!alreadyExists) {
              setReservations((prev) => [...prev, incoming]);
            }
          } else if (payload.eventType === "UPDATE") {
            setReservations((prev) =>
              prev.map((r) =>
                r.id === payload.new.id ? (payload.new as Reservation) : r,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setReservations((prev) =>
              prev.filter((r) => r.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedField]);

  useEffect(() => {
    if (!selectedField) return;

    const channel = supabase
      .channel(`bookings:${selectedField.id}`)
      .on("broadcast", { event: "new" }, ({ payload }) => {
        const incoming = payload as Reservation;
        if (!reservationsRef.current.some((r) => r.id === incoming.id)) {
          setReservations((prev) => [...prev, incoming]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedField]);

  // Closed hours store start times, but calendar rows are labeled by end time
  // (row X shows bookings ending at X, i.e. starting at X-1).
  // So a closed start hour maps to the calendar row at (start + 1) % 24.
  const isHourClosed = (day: Date, hour: number) =>
    closedHours.some(
      (c) =>
        (c.hour + 1) % 24 === hour &&
        c.closed_date === format(day, "yyyy-MM-dd"),
    );

  const nextWeek = () => setReferenceDay((prev) => addWeeks(prev, 1));
  const prevWeek = () => setReferenceDay((prev) => subWeeks(prev, 1));

  return {
    setReferenceDay,
    selectedField,
    weekDays,
    hours,
    reservationStartHours,
    workingEndHours,
    selectedSlot,
    setSelectedSlot,
    closeMenu,
    nextWeek,
    prevWeek,
    reservations,
    createReservation,
    isLoading,
    error,
    updateReservation,
    isUpdating,
    updateError,
    deleteReservation,
    isDeleting,
    deleteError,
    approveReservation,
    rejectReservation,
    isApprovingId,
    isRejectingId,
    statusError,
    isFetching,
    isHourClosed,
    refetch: () => setRefetchKey((k) => k + 1),
  };
}
