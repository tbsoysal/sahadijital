import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "./useUser";
import { ReservationFormData } from "./types";
import { useFields } from "@/lib/hooks/dashboard/useFields";


export function useCreateReservation() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { currUser } = useUser();
  const { selectedField } = useFields();

  const createReservation = async (formData: ReservationFormData) => {
    if (!currUser) {
      setSaveError("Kullanıcı bilgisi yükleniyor, lütfen bekleyin");
      return { success: false, error: "Kullanıcı bilgisi yükleniyor" };
    }

    if (!formData.customerName.trim()) {
      setSaveError("Müşterı adı gereklidir");
      return { success: false, error: "Müşteri adı gereklidir" };
    }

    if (!formData.customerPhone.trim()) {
      setSaveError("Telefon numarası gereklidir");
      return { success: false, error: "Telefon numarası gereklidir" };
    }

    if (!selectedField) {
      setSaveError("Lütfen bir saha seçin");
      return { success: false, error: "Lütfen bir saha seçin" };
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Parse date and time components
      const [year, month, day] = formData.date.split("-").map(Number);
      const [startHour, startMinute] = formData.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = formData.endTime.split(":").map(Number);

      // Create Date objects in LOCAL timezone (Turkey UTC+3)
      // Using Date constructor: new Date(year, monthIndex, day, hour, minute, second)
      // This treats the time as local time, not UTC
      const startDateTime = new Date(
        year,
        month - 1,
        day,
        startHour,
        startMinute,
        0,
      );
      const endDateTime = new Date(year, month - 1, day, endHour, endMinute, 0);

      // Convert to ISO string - this will correctly convert local time to UTC
      // Example: 14:00 Turkey time → stored as 11:00 UTC (which is correct!)
      const startTimeISO = startDateTime.toISOString();
      const endTimeISO = endDateTime.toISOString();

      // Insert reservation
      const { data, error } = await supabase
        .from("reservations")
        .insert({
          business_id: currUser.businessId,
          field_id: selectedField.id,
          customer_name: formData.customerName.trim(),
          customer_phone: formData.customerPhone.trim(),
          start_time: startTimeISO,
          end_time: endTimeISO,
          price: parseFloat(formData.price) || 0,
          status: "confirmed",
          paid: formData.paid,
          note: formData.note?.trim() || null,
        })
        .select()
        .single();

      if (error) {
        console.error("Reservation save error: ", error);
        const errorMsg = error.message || "Rezervasyon kaydedilemedi";
        setSaveError(errorMsg);
        return { success: false, error: errorMsg };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error: ", err);
      const errorMsg = "Beklenmeyen bir hata oluştu";
      setSaveError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    createReservation,
    isSaving,
    saveError,
    setSaveError,
  };
}
