import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { format, isSameDay, isToday } from "date-fns";
import { tr } from "date-fns/locale";
import { ReservationMenu } from "./ReservationMenu";

const DAY_LABELS = ["P", "S", "Ç", "P", "C", "C", "P"];

interface WeeklyCalendarProps {
  onAddClick?: () => void;
}

export function WeeklyCalendar({ onAddClick }: WeeklyCalendarProps) {
  const {
    weekDays,
    hours,
    selectedSlot,
    setSelectedSlot,
    nextWeek,
    prevWeek,
    reservations,
  } = useCalendar();

  const getSlotReservations = (day: Date, hour: number) =>
    reservations.filter(
      (r) =>
        isSameDay(new Date(r.reservation_date), day) && r.start_time === hour,
    );

  return (
    <div className="relative flex h-full flex-col overflow-visible border border-gray-200 bg-white">
      <div className="col-span-1 flex items-center justify-between px-3 py-2">
        <button
          onClick={prevWeek}
          className="text-md leading-none font-medium text-gray-700 hover:text-gray-600"
        >
          ‹
        </button>
        <p className="font-medium">
          {format(weekDays[0], "d MMMM", { locale: tr })} -{" "}
          {format(weekDays[6], "d MMMM", { locale: tr })}
        </p>
        <button
          onClick={nextWeek}
          className="text-md font-m leading-none text-gray-700 hover:text-gray-600"
        >
          ›
        </button>
      </div>
      {/* Scrollable time grid */}
      <div>
        {/* Week header */}
        <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-gray-200 bg-white">
          <div></div>
          {weekDays.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 py-2">
              <span className="text-[11px] font-medium text-gray-400">
                {DAY_LABELS[i]}
              </span>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  isToday(day) ? "bg-green-500 text-white" : "text-gray-800"
                }`}
              >
                {day.getDate()}
              </span>
            </div>
          ))}
        </div>

        {hours.map((hour) => (
          <div
            key={hour}
            className="grid min-h-12 grid-cols-[56px_repeat(7,1fr)]"
          >
            {/* Hour label */}
            <div className="relative -bottom-2 flex items-end justify-end pt-1 pr-2 text-sm font-medium text-[#717680]">
              {String(hour).padStart(2, "0")}:00
            </div>

            {/* Day cells */}
            {weekDays.map((day, di) => {
              const slotReservations = getSlotReservations(day, hour);
              const isSelected =
                selectedSlot &&
                isSameDay(selectedSlot.day, day) &&
                selectedSlot.hour === hour;

              return (
                <div
                  key={di}
                  onClick={() => setSelectedSlot({ day, hour })}
                  className={`cursor-pointer border-b border-l border-gray-100 p-0.5 transition-colors ${
                    isSelected ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  {slotReservations.map((r) => (
                    <div
                      key={r.id}
                      className="mb-0.5 rounded-lg bg-green-500 px-1.5 py-1 text-[10px] text-white"
                    >
                      <p className="truncate leading-tight font-semibold">
                        {r.customer_name}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={onAddClick}
        className="absolute right-6 bottom-6 flex h-9 w-9 items-center justify-center rounded-xl bg-green-500 text-xl text-white shadow-md transition-colors hover:bg-green-600"
      >
        +
      </button>
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedSlot(null)}
          />
          <div className="relative w-full rounded-t-2xl bg-white shadow-xl">
            <ReservationMenu
              slot={selectedSlot}
              onClose={() => setSelectedSlot(null)}
              onSave={() => setSelectedSlot(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
