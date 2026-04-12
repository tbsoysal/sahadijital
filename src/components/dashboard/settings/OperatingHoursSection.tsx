"use client";

import { useState, useEffect } from "react";
import { NotificationModal } from "@/components/NotificationModal";
import SettingsCard from "./SettingsCard";
import { useDashboardContext } from "@/context/DashboardContext";
import { calendarService } from "@/lib/services/calendarService";

const ALL_HOURS = Array.from({ length: 24 }, (_, i) => i);

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function OperatingHoursSection() {
  const { fields, selectedField, setFields, setSelectedField } =
    useDashboardContext();

  const [selectedFieldId, setSelectedFieldId] = useState<string>(
    selectedField?.id ?? "",
  );
  const [startHour, setStartHour] = useState<number>(
    selectedField?.start_hour ?? 11,
  );
  const [endHour, setEndHour] = useState<number>(selectedField?.end_hour ?? 0);
  const [isSaving, setIsSaving] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [confirmModal, setConfirmModal] = useState(false);

  // Sync local state when context field changes
  useEffect(() => {
    if (selectedField && !selectedFieldId) {
      setSelectedFieldId(selectedField.id);
    }
  }, [selectedField, selectedFieldId]);

  // When field selection changes, update the hour pickers to reflect that field's settings
  const handleFieldChange = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    const field = fields?.find((f) => f.id === fieldId);
    if (field) {
      setStartHour(field.start_hour);
      setEndHour(field.end_hour);
    }
  };

  const currentField = fields?.find((f) => f.id === selectedFieldId);
  const hasChanges =
    currentField &&
    (currentField.start_hour !== startHour || currentField.end_hour !== endHour);

  const handleSave = () => {
    if (startHour === endHour) {
      setErrorModal({
        open: true,
        message: "Açılış ve kapanış saati aynı olamaz. En az 1 saatlik çalışma süresi gereklidir.",
      });
      return;
    }
    setConfirmModal(true);
  };

  const confirmSave = async () => {
    setConfirmModal(false);
    if (!selectedFieldId) return;
    setIsSaving(true);
    try {
      await calendarService.updateFieldHours(selectedFieldId, startHour, endHour);

      // Update local context so the calendar reflects the new hours immediately
      setFields(
        (fields ?? []).map((f) =>
          f.id === selectedFieldId
            ? { ...f, start_hour: startHour, end_hour: endHour }
            : f,
        ),
      );
      if (selectedField?.id === selectedFieldId) {
        setSelectedField({
          ...selectedField,
          start_hour: startHour,
          end_hour: endHour,
        });
      }

      setSuccessModal(true);
    } catch (err) {
      setErrorModal({
        open: true,
        message: err instanceof Error ? err.message : "Bir hata oluştu.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <SettingsCard title="Çalışma Saatleri">
        <p className="mb-4 text-sm text-gray-500">
          Sahanın günlük açılış ve kapanış saatlerini belirleyin. Bu saatler
          dışında rezervasyon yapılamaz.
        </p>

        {/* Field selector — only shown when there are multiple fields */}
        {fields && fields.length > 1 && (
          <div className="mb-4">
            <select
              value={selectedFieldId}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="w-full rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-base font-medium focus:outline-none"
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Açılış Saati
            </label>
            <select
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
              className="rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-base font-medium focus:outline-none"
            >
              {ALL_HOURS.map((h) => (
                <option key={h} value={h}>
                  {formatHour(h)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Kapanış Saati
            </label>
            <select
              value={endHour}
              onChange={(e) => setEndHour(Number(e.target.value))}
              className="rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-base font-medium focus:outline-none"
            >
              {ALL_HOURS.map((h) => (
                <option key={h} value={h}>
                  {formatHour(h)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Gece yarısını geçen saatler desteklenir (ör. 22:00 – 02:00).
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="rounded-lg bg-[#12B76A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0EA05E] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </SettingsCard>

      {/* Confirm — warns that out-of-range closed hours will be deleted */}
      <NotificationModal
        open={confirmModal}
        variant="warning"
        title="Çalışma Saatlerini Güncelle"
        message="Yeni çalışma saatleri dışında kalan kapalı saatler otomatik olarak silinecek. Devam etmek istiyor musunuz?"
        actionText="Evet, Güncelle"
        cancelText="İptal"
        onAction={confirmSave}
        onCancel={() => setConfirmModal(false)}
      />

      {/* Success */}
      <NotificationModal
        open={successModal}
        variant="success"
        title="Kaydedildi"
        message="Çalışma saatleri başarıyla güncellendi."
        onAction={() => setSuccessModal(false)}
      />

      {/* Error */}
      <NotificationModal
        open={errorModal.open}
        variant="error"
        title="Hata"
        message={errorModal.message}
        onAction={() => setErrorModal({ open: false, message: "" })}
      />
    </>
  );
}
