"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useBookingCalendar } from "@/lib/hooks/booking/useBookingCalendar";

const DAY_LABELS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

interface Field {
  id: string;
  name: string;
  default_price: number;
}

interface Props {
  businessName: string;
  fields: Field[];
}

export default function BookingView({ businessName, fields }: Props) {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selectedField, setSelectedField] = useState<Field>(fields[0]);
  const { days, hours, selectedDay, setSelectedDay, reservations, isFetching } =
    useBookingCalendar(selectedField.id);

  const isSlotBooked = (hour: number) => {
    return (reservations ?? []).some((r) => {
      const start = parseInt(r.start_time);
      const end = parseInt(r.end_time);
      // end===0 means the reservation ends at midnight (e.g. 21:00–00:00).
      // It blocks every hour from start up to (but not including) 00:00.
      if (end === 0) return start <= hour;
      return start <= hour && end > hour;
    });
  };

  const isSlotPast = (hour: number) => {
    const now = new Date();
    const slotDate = new Date(selectedDay);
    // Hours 0 and 1 are past-midnight slots belonging to the next day
    if (hour === 0 || hour === 1) slotDate.setDate(slotDate.getDate() + 1);
    slotDate.setHours(hour, 0, 0, 0);
    return slotDate < now;
  };

  const handleSlotClick = (hour: number) => {
    const date = format(selectedDay, "yyyy-MM-dd");
    router.push(
      `/book/${slug}/confirm?fieldId=${selectedField.id}&fieldName=${encodeURIComponent(selectedField.name)}&hour=${hour}&date=${date}&price=${selectedField.default_price}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 md:flex md:items-start md:justify-center md:py-10">
      <div className="w-full md:max-w-2xl md:overflow-hidden md:rounded-2xl md:shadow-lg">
        {/* Green Header */}
        <div className="bg-[#12B76A] px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl">
                ⚽
              </div>
              <div>
                <p className="text-lg font-bold text-white">{businessName}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm font-semibold text-white">Açık</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-gray-100 px-4 py-5 md:px-6 md:py-6">
          {/* SAHA SEÇ */}
          {fields.length > 1 && (
            <div>
              <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500">
                SAHA SEÇ
              </p>
              <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field)}
                    className={`shrink-0 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                      selectedField.id === field.id
                        ? "border-[#12B76A] bg-white"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p
                      className={`font-bold ${selectedField.id === field.id ? "text-[#12B76A]" : "text-gray-800"}`}
                    >
                      {field.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TARİH SEÇ */}
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500">
              TARİH SEÇ
            </p>
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
              {days.map((day, i) => {
                const isSelected =
                  format(day, "yyyy-MM-dd") ===
                  format(selectedDay, "yyyy-MM-dd");
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(day)}
                    className={`flex shrink-0 flex-col items-center rounded-xl px-4 py-3 transition-colors ${
                      isSelected
                        ? "bg-[#12B76A] text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${isSelected ? "text-white" : "text-gray-400"}`}
                    >
                      {DAY_LABELS[day.getDay()]}
                    </span>
                    <span className="text-xl font-bold">{day.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SAAT SEÇ */}
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500">
              SAAT SEÇ
            </p>
            {/* Legend */}
            <div className="mb-3 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
                <span className="text-sm text-gray-600">Müsait</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-600">Dolu</span>
              </div>
            </div>

            {isFetching ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-xl bg-gray-200"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {hours.map((hour) => {
                  const booked = isSlotBooked(hour);
                  const past = isSlotPast(hour);
                  const disabled = booked || past;

                  return (
                    <button
                      key={hour}
                      disabled={disabled}
                      onClick={() => !disabled && handleSlotClick(hour)}
                      className={`rounded-xl p-4 text-left transition-colors ${
                        disabled ? "bg-gray-100" : "bg-white shadow-sm"
                      }`}
                    >
                      <p
                        className={`text-2xl font-bold ${disabled ? "text-gray-400" : "text-gray-800"}`}
                      >
                        {String(hour).padStart(2, "0")}:00
                      </p>
                      <p
                        className={`text-sm ${disabled ? "text-gray-400" : "text-gray-500"}`}
                      >
                        1 saat
                      </p>
                      {booked ? (
                        <p className="text-sm text-gray-400">Dolu</p>
                      ) : past ? (
                        <p className="text-sm text-gray-400">Geçmiş</p>
                      ) : (
                        <p className="text-sm font-semibold text-[#12B76A]">
                          ₺{selectedField.default_price}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
