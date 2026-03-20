import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { addDays, format, isSameDay, isToday } from "date-fns";
import { tr } from "date-fns/locale";
import { useEffect } from "react";
import { ReservationMenu } from "./ReservationMenu";

const DAY_LABELS = ["P", "S", "Ç", "P", "C", "C", "P"];

export function WeeklyCalendar() {
  const {
    weekDays,
    hours,
    selectedSlot,
    setSelectedSlot,
    nextWeek,
    prevWeek,
    reservations,
    isFetching,
    createReservation,
    isLoading,
    error,
    updateReservation,
    isUpdating,
    updateError,
    deleteReservation,
    isDeleting,
    deleteError,
    closeMenu,
  } = useCalendar();

  useEffect(() => {
    document.body.style.overflow = selectedSlot ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSlot]);

  const getSlotReservations = (day: Date, hour: number) => {
    if (hour === 0) {
      return reservations.filter(
        (r) =>
          isSameDay(new Date(r.reservation_date), day) &&
          parseInt(r.end_time) === 0,
      );
    }
    const reservationDay = hour === 1 ? addDays(day, 1) : day;
    return reservations.filter(
      (r) =>
        isSameDay(new Date(r.reservation_date), reservationDay) &&
        parseInt(r.start_time) < hour &&
        parseInt(r.end_time) >= hour,
    );
  };


  return (
    <div className="relative flex min-h-screen flex-col overflow-visible border-t border-r border-l border-gray-200 bg-white">
      <div className="col-span-1 flex items-center justify-between px-3 py-2">
        <button
          onClick={prevWeek}
          className="text-md leading-none font-medium text-gray-700 hover:text-gray-600"
        >
          ‹
        </button>
        <div className="flex flex-col items-center">
          <p className="font-medium">
            {format(weekDays[0], "d MMMM", { locale: tr })} -{" "}
            {format(weekDays[6], "d MMMM", { locale: tr })}
          </p>
          <p className="text-xs text-gray-400">{reservations.length} rezervasyon</p>
        </div>
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

        {isFetching ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid min-h-12 grid-cols-[56px_repeat(7,1fr)]">
              <div className="flex items-center justify-end pr-2">
                <div className="h-3 w-8 animate-pulse rounded bg-gray-100" />
              </div>
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="border-b border-l border-gray-100 p-1">
                  {i % 3 === 0 && j % 2 === 0 && (
                    <div className="h-full w-full animate-pulse rounded-lg bg-gray-100" />
                  )}
                </div>
              ))}
            </div>
          ))
        ) : hours.map((hour) => (
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
                  className={`cursor-pointer overflow-hidden border-b border-l border-gray-100 p-0.5 transition-colors ${
                    isSelected ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  {slotReservations.map((r) => (
                    <div
                      key={r.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSlot({ day, hour, reservation: r });
                      }}
                      className={`mb-0.5 h-full rounded-lg px-1.5 py-1 text-[10px] ${r.is_paid ? "bg-green-500 text-white" : "bg-gray-400 text-gray-600"}`}
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
        onClick={() => setSelectedSlot({ day: new Date(), hour: hours[0] })}
        className="fixed right-6 bottom-6 z-40 flex h-9 w-9 items-center justify-center rounded-xl bg-green-500 text-xl text-white shadow-md transition-colors hover:bg-green-600"
      >
        +
      </button>
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/30" onClick={closeMenu} />
          <div className="animate-slide-up relative w-full rounded-t-2xl bg-white shadow-xl will-change-transform backface-hidden">
            <ReservationMenu
              slot={selectedSlot}
              onClose={closeMenu}
              onSave={
                selectedSlot.reservation
                  ? (data) =>
                      updateReservation(selectedSlot.reservation!.id, data)
                  : createReservation
              }
              isLoading={isLoading || isUpdating}
              error={error ?? updateError ?? deleteError}
              onDelete={
                selectedSlot.reservation
                  ? () => deleteReservation(selectedSlot.reservation!.id)
                  : undefined
              }
              isDeleting={isDeleting}
            />
          </div>
        </div>
      )}
    </div>
  );
}
