"use client";

import { Lock, LockOpen } from "lucide-react";
import { NotificationModal } from "@/components/NotificationModal";
import SettingsCard from "./SettingsCard";
import { useClosedHours } from "@/lib/hooks/dashboard/useClosedHours";

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function ClosedHoursSection() {
  const {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    selectedDate,
    setSelectedDate,
    today,
    workingHours,
    isFetching,
    isHourClosed,
    handleToggle,
    conflictModal,
    closeConflictModal,
    errorModal,
    closeErrorModal,
  } = useClosedHours();

  return (
    <>
      <SettingsCard title="Saat Kapatma">
        <p className="mb-4 text-sm text-gray-500">
          Seçili saha ve tarihe ait saatleri kapatarak o saate rezervasyon
          yapılmasını engelleyebilirsiniz.
        </p>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          {/* Field selector — only shown when there are multiple fields */}
          {fields && fields.length > 1 && (
            <select
              value={selectedFieldId}
              onChange={(e) => setSelectedFieldId(e.target.value)}
              className="flex-1 rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-base font-medium focus:outline-none"
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          )}

          {/* Date picker */}
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-base font-medium focus:outline-none"
          />
        </div>

        {/* Hour grid */}
        {isFetching ? (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {workingHours.map((hour) => {
              const closed = isHourClosed(hour);
              return (
                <button
                  key={hour}
                  onClick={() => handleToggle(hour)}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                    closed
                      ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                      : "border-gray-200 bg-gray-50 text-[#181D27] hover:bg-gray-100"
                  }`}
                >
                  {closed ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <LockOpen className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  {formatHour(hour)}
                </button>
              );
            })}
          </div>
        )}

        <p className="mt-3 text-xs text-gray-400">
          Kapalı saatler müşterilere "Kapalı" olarak görünür ve rezervasyon
          yapılamaz.
        </p>
      </SettingsCard>

      {/* Conflict warning */}
      <NotificationModal
        open={conflictModal.open}
        variant="warning"
        title="Saat Kapatılamaz"
        message={conflictModal.message}
        onAction={closeConflictModal}
      />

      {/* Generic error */}
      <NotificationModal
        open={errorModal.open}
        variant="error"
        title="Hata"
        message={errorModal.message}
        onAction={closeErrorModal}
      />
    </>
  );
}
