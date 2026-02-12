"use client";

import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { format, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import React, { useState } from "react";
import { ReservationMenu } from "./ReservationMenu";

export function WeeklyCalendar() {
  const { currentDate, weekStart, weekDays } = useCalendar();
  const [selectedSlot, setSelectedSlot] = useState<{
    day: Date;
    hour: number;
  } | null>(null);
  const hours = Array.from({ length: 15 }, (_, i) => (i + 12) % 24);

  return (
    <div className="mb-8 flex w-full flex-col">
      {/* Header: Günler */}
      <div className="grid grid-cols-8">
        <div className="p-2"></div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="flex flex-col items-center p-2 last:border-0"
          >
            <span className="text-sm text-gray-500 uppercase">
              {format(day, "eeeee", { locale: tr })}
            </span>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${isSameDay(day, new Date()) ? "bg-[#027A48] text-white" : ""}`}
            >
              {format(day, "d")}
            </span>
          </div>
        ))}
      </div>

      {/* Body: Saatler ve Hücreler */}
      <div className="grid grid-cols-8 bg-white">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* sol saat hücresi */}
            <div className="relative flex h-12 justify-end px-2 text-xs font-medium text-[#717680]">
              <div className="absolute -bottom-2 text-end">
                {String(hour).padStart(2, "0")}:00
              </div>
            </div>

            {/* gün hücreleri */}
            {weekDays.map((day) => (
              <div
                onClick={() => setSelectedSlot({ day, hour })}
                key={day.toISOString() + hour}
                className={`h-12 border-b border-l border-[#E9EAEB] p-1 ${selectedSlot && isSameDay(selectedSlot.day, day) && selectedSlot.hour == hour ? "border-primary border-2! text-white" : ""}`}
              ></div>
            ))}
          </React.Fragment>
        ))}

        <ReservationMenu
          isOpen={selectedSlot !== null}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </div>
    </div>
  );
}
