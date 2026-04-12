"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { generateFieldHours } from "@/lib/constants";
import { calendarService } from "@/lib/services/calendarService";
import { bookingService } from "@/lib/services/bookingService";
import { ClosedHour, Reservation } from "@/types";
import { format, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";

function hourOccupied(reservations: Reservation[], hour: number): Reservation | undefined {
  return reservations.find((r) => {
    if (r.status === "rejected") return false;
    const start = parseInt(r.start_time.slice(0, 2), 10);
    const end = parseInt(r.end_time.slice(0, 2), 10);
    if (end === 0) return hour >= start;
    return hour >= start && hour < end;
  });
}

export function useClosedHours() {
  const { selectedField, fields } = useDashboardContext();

  // Derive working hours from whichever field is selected in this section
  const getFieldHours = (fieldId: string) => {
    const field = fields?.find((f) => f.id === fieldId) ?? selectedField;
    return generateFieldHours(field?.start_hour ?? 11, field?.end_hour ?? 0);
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedFieldId, setSelectedFieldId] = useState<string>(
    selectedField?.id ?? "",
  );
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [closedHours, setClosedHours] = useState<ClosedHour[]>([]);
  const [reservationsForDay, setReservationsForDay] = useState<Reservation[]>(
    [],
  );
  const [isFetching, setIsFetching] = useState(false);
  const [conflictModal, setConflictModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  // Keep selectedFieldId in sync when the context field changes
  useEffect(() => {
    if (selectedField && !selectedFieldId) {
      setSelectedFieldId(selectedField.id);
    }
  }, [selectedField, selectedFieldId]);

  // Fetch closed hours + reservations whenever field or date changes
  useEffect(() => {
    if (!selectedFieldId || !selectedDate) return;

    const date = parseISO(selectedDate);
    setIsFetching(true);

    Promise.all([
      calendarService.fetchClosedHoursForDay(selectedFieldId, date),
      bookingService.fetchReservationsForDay(selectedFieldId, date),
    ])
      .then(([closed, reservations]) => {
        setClosedHours(closed);
        setReservationsForDay(reservations);
      })
      .catch((err) => {
        setErrorModal({
          open: true,
          message: err instanceof Error ? err.message : "Bir hata oluştu.",
        });
      })
      .finally(() => setIsFetching(false));
  }, [selectedFieldId, selectedDate]);

  const isHourClosed = useCallback(
    (hour: number) => closedHours.some((c) => c.hour === hour),
    [closedHours],
  );

  const handleClose = async (hour: number) => {
    const conflict = hourOccupied(reservationsForDay, hour);
    if (conflict) {
      setConflictModal({
        open: true,
        message: `Bu saatte ${conflict.customer_name} adına rezervasyon var. Saati kapatmak için önce rezervasyonu iptal edin.`,
      });
      return;
    }

    try {
      const newEntry = await calendarService.closeHour(
        selectedFieldId,
        parseISO(selectedDate),
        hour,
      );
      setClosedHours((prev) => [...prev, newEntry]);
    } catch (err) {
      setErrorModal({
        open: true,
        message: err instanceof Error ? err.message : "Bir hata oluştu.",
      });
    }
  };

  const handleOpen = async (hour: number) => {
    const entry = closedHours.find((c) => c.hour === hour);
    if (!entry) return;

    try {
      await calendarService.openHour(entry.id);
      setClosedHours((prev) => prev.filter((c) => c.id !== entry.id));
    } catch (err) {
      setErrorModal({
        open: true,
        message: err instanceof Error ? err.message : "Bir hata oluştu.",
      });
    }
  };

  const handleToggle = (hour: number) => {
    if (isHourClosed(hour)) {
      handleOpen(hour);
    } else {
      handleClose(hour);
    }
  };

  return {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    selectedDate,
    setSelectedDate,
    today,
    workingHours: getFieldHours(selectedFieldId).reservationStartHours,
    isFetching,
    isHourClosed,
    handleToggle,
    conflictModal,
    closeConflictModal: () => setConflictModal({ open: false, message: "" }),
    errorModal,
    closeErrorModal: () => setErrorModal({ open: false, message: "" }),
  };
}
