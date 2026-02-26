"use client";

import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { format, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import React, { useEffect, useRef } from "react";
import { ReservationMenu } from "./ReservationMenu";
import { useReservation } from "@/lib/hooks/dashboard/useReservation";
import { Reservation } from "@/lib/hooks/dashboard/types";

export function WeeklyCalendar() {
  const calendarRef = useRef<HTMLDivElement>(null)
  const { weekDays, hours, selectedSlot, setSelectedSlot, nextWeek, prevWeek } = useCalendar();
  const { getReservationForSlot, loading, refresh } = useReservation(
    weekDays[0],
    weekDays[6],
  );

  useEffect(() => {
    // 1. Only run if we are in the browser and have a ref
    if (typeof window === "undefined" || !calendarRef.current) return;

    let mc: HammerManager | null = null;

    // 2. Import Hammer dynamically
    import("hammerjs").then((HammerModule) => {
      const Hammer = HammerModule.default;

      mc = new Hammer(calendarRef.current!);
      mc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

      mc.on("swipeleft", () => nextWeek());
      mc.on("swiperight", () => prevWeek());
    });

    // 3. Cleanup
    return () => {
      if (mc) mc.destroy();
    };
  }, [nextWeek, prevWeek]);


  if (loading) {
    return <div className="flex items-center justify-center font-medium text-2xl h-screen w-full">Takvim Yükleniyor...</div>; // Or a skeleton loader
  }

  return (
    <div ref={calendarRef} style={{ touchAction: 'pan-y', userSelect: 'none' }} className="mb-8 flex w-full flex-col">
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
                  className={`h-12 border-b border-l border-[#E9EAEB] p-px ${selectedSlot && isSameDay(selectedSlot.day, day) && selectedSlot.hour === hour ? "border-primary border-2! text-white" : ""}`}
                >
                  {reservation && (
                    <div className="truncate font-medium text-xs bg-primary text-white w-full h-full rounded-sm p-px">
                      <p>{reservation.customer_name.split(" ")[0]}</p>
                      <p>{reservation.customer_name.split(" ")[1]}</p>
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
