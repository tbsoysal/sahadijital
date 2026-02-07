"use client";

import trLocale from "@fullcalendar/core/locales/tr";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Events } from "@/lib/hooks/dashboard/useCalendar";

export default function Calendar() {
  return (
    <div className="h-full overflow-scroll">
      <FullCalendar
        locale={trLocale}
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        events={Events}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="01:00:00"
        nowIndicator
        height="100%"
        expandRows
        headerToolbar={false}
        dayHeaderFormat={{ weekday: "narrow", day: "numeric" }}
        eventContent={(arg) => (
          <div className="h-full w-full rounded-md bg-green-500 p-1 text-[10px] font-normal text-white">
            {arg.event.title}
          </div>
        )}
        dayHeaderContent={(arg) => {
          // Split the "P 26" string FullCalendar generates
          const [weekday, day] = arg.text.split(" ");

          return (
            <div className="flex flex-col justify-center">
              <span className="block text-[12px] font-medium text-[#717680]">
                {day}
              </span>
              <span
                className={`block h-5 w-5 rounded-full text-sm font-medium ${arg.isToday ? "bg-[#027A48] text-white" : "text-black"}`}
              >
                {weekday}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}
