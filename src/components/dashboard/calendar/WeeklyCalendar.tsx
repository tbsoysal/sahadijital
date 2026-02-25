"use client";

import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { format, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import React, { useState } from "react";
import { ReservationMenu } from "./ReservationMenu";
import { useReservation } from "@/lib/hooks/dashboard/useReservation";
import { Reservation } from "@/lib/hooks/dashboard/types";

export function WeeklyCalendar() {
  const { weekDays } = useCalendar(); // array of current week days dates
  const [selectedSlot, setSelectedSlot] = useState<{
    day: Date;
    hour: number;
    reservation?: Reservation;
  } | null>(null);
  const hours = Array.from({ length: 15 }, (_, i) => (i + 12) % 24); // [12, 13, 14, ..., 23, 0, 1, 2]
  const { getReservationForSlot, loading, refresh } = useReservation(
    weekDays[0],
    weekDays[6],
  );

  console.log("WeeklyCalendar rendered");
  if (loading) {
    return <div>Takvim Yükleniyor...</div>; // Or a skeleton loader
  }

  return (
    <div className="mb-8 flex w-full flex-col">
      {/* Header: Günler */}
      <div className="sticky top-14 z-10 grid grid-cols-8 bg-[#f5f5f5]">
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
            {weekDays.map((day) => {
              const reservation: Reservation = getReservationForSlot(day, hour - 1)[0]; // get reservation column values for current day and hour values

              return (
                <div
                  onClick={() => setSelectedSlot({ day, hour, reservation })}
                  key={day.toISOString()}
                  className={`h-12 border-b border-l border-[#E9EAEB] p-1 ${selectedSlot && isSameDay(selectedSlot.day, day) && selectedSlot.hour === hour ? "border-primary border-2! text-white" : ""} ${reservation ? "bg-primary text-white" : ""}`}
                >
                  {reservation && (
                    <div className="truncate text-xs">
                      {reservation.customer_name}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}

        <ReservationMenu
          isOpen={selectedSlot !== null}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          onReservationSaved={refresh}
        />
      </div>
    </div>
  );
}
