"use client";

import trLocale from "@fullcalendar/core/locales/tr";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  return (
    <div className="h-full overflow-scroll">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={trLocale}
        firstDay={1}
        allDaySlot={false}
        nowIndicator
        selectable
        height="auto"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // ⏰ 24 saat
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dayHeaderFormat={{
          weekday: "short",
          day: "numeric",
        }}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        select={(info) => {
          console.log("Start:", info.startStr);
          console.log("End:", info.endStr);
        }}
      />
    </div>
  );
}
