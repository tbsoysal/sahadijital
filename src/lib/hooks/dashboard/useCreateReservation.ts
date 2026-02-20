import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type ReservationData = {
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  fieldId: string;
  fieldName: string;
  price: string;
  isPaid: boolean;
  note?: string;
};

export function useCreateReservation() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const createReservation = async (reservation: ReservationData) => {
    if (!reservation.customerName.trim()) {
      setSaveError("Müşterı adı gereklidir");
      return { success: false, error: "Müşteri adı gereklidir" };
    }

    if (!reservation.customerPhone.trim()) {
      setSaveError("Telefon numarası gereklidir");
      return { success: false, error: "Telefon numarası gereklidir" };
    }

    if (!reservation.fieldId) {
      setSaveError("Lütfen bir saha seçin");
      return { success: false, error: "Lütfen bir saha seçin" };
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        const errorMsg = "Oturum açmanız gerekiyor";
        setSaveError(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Get business_id from users table
      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select("business_id")
        .eq("auth_id", user.id)
        .single();

      if (userDataError || !userData?.business_id) {
        const errorMsg = "İşletme bilgisi bulunamadı";
        setSaveError(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Parse date and time components
      const [year, month, day] = reservation.date.split("-").map(Number);
      const [startHour, startMinute] = reservation.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = reservation.endTime.split(":").map(Number);

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

      // Map payment status
      const paymentStatus = reservation.isPaid ? "paid" : "unpaid";

      // Insert reservation
      const { data, error } = await supabase
        .from("reservations")
        .insert({
          business_id: userData.business_id,
          field_id: reservation.fieldId,
          customer_name: reservation.customerName.trim(),
          customer_phone: reservation.customerPhone.trim(),
          start_time: startTimeISO,
          end_time: endTimeISO,
          price: parseFloat(reservation.price) || 0,
          status: "confirmed",
          payment_status: paymentStatus,
          payment_method: reservation.isPaid ? "cash" : null,
          note: reservation.note?.trim() || null,
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
