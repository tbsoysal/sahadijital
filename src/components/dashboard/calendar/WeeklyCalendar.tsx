import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { addDays, format, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { ReservationMenu } from "./ReservationMenu";
import Button from "@/components/Button";
import { Plus } from "lucide-react";

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export function WeeklyCalendar() {
  const {
    selectedField,
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

  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    setToday(new Date());
  }, []);
  const checkIsToday = (day: Date) => today !== null && isSameDay(day, today);

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
    <div className="relative flex h-full flex-col overflow-hidden border-t border-r border-l border-gray-200 bg-white md:rounded-xl">
      <div className="relative col-span-1 flex items-center justify-between px-3 py-2 md:justify-center md:gap-5">
        <Button variant="secondary" onClick={prevWeek} className="px-2.5 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Button>
        <div className="flex flex-col items-center">
          <p className="font-medium md:text-lg">
            {format(weekDays[0], "d MMMM", { locale: tr })} -{" "}
            {format(weekDays[6], "d MMMM", { locale: tr })}
          </p>
          <p className="text-xs text-gray-400 md:text-lg">
            {reservations.length} rezervasyon
          </p>
        </div>
        <Button variant="secondary" onClick={nextWeek} className="px-2.5 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Button>
        <Button
          onClick={() => setSelectedSlot({ day: new Date(), hour: 12 })}
          className="absolute top-2/3 right-4 hidden -translate-y-1/2 gap-1 px-3 py-1.5 text-sm md:inline-flex"
        >
          <Plus className="h-3.5 w-3.5" />
          Rezervasyon Oluştur
        </Button>
      </div>
      {/* Color legend */}
      <div className="flex items-center justify-center gap-4 border-b border-gray-100 px-3 py-1.5 md:border-gray-300">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
          <span className="text-xs text-gray-500">Ödendi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
          <span className="text-xs text-gray-500">Ödenmedi</span>
        </div>
      </div>
      {/* Week header — fixed, does not scroll */}
      <div className="grid shrink-0 grid-cols-[56px_repeat(7,1fr)] border-b border-gray-200 bg-white md:grid-cols-[74px_repeat(7,1fr)] md:border-gray-300">
        <div></div>
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="flex items-center justify-center py-2 md:py-3"
          >
            {/* Mobile: stacked label + number circle */}
            <div className="flex flex-col items-center gap-0.5 md:hidden">
              <span className="text-[11px] font-medium text-gray-400">
                {DAY_LABELS[i]}
              </span>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  checkIsToday(day)
                    ? "bg-[#12B76A] text-white"
                    : "text-gray-800"
                }`}
              >
                {day.getDate()}
              </span>
            </div>
            {/* Tablet/Desktop: inline pill */}
            <span
              className={`hidden items-center gap-1 rounded-full px-2 py-1 text-base md:flex ${
                checkIsToday(day) ? "bg-[#12B76A] text-white" : "text-gray-700"
              }`}
            >
              <span className="mr-1 text-lg font-bold">{day.getDate()}</span>
              <span
                className={`text-lg font-normal ${checkIsToday(day) ? "text-white" : "text-gray-500"}`}
              >
                {DAY_LABELS[i]}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Time slot rows — only this area scrolls */}
      <div className="flex-1 overflow-y-auto">
        {isFetching
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="grid h-12 grid-cols-[56px_repeat(7,1fr)] md:h-16 md:grid-cols-[74px_repeat(7,1fr)]"
              >
                <div className="flex items-center justify-end pr-2">
                  <div className="h-3 w-8 animate-pulse rounded bg-gray-100" />
                </div>
                {Array.from({ length: 7 }).map((_, j) => (
                  <div
                    key={j}
                    className="border-b border-l border-gray-100 p-1"
                  >
                    {i % 3 === 0 && j % 2 === 0 && (
                      <div className="h-full w-full animate-pulse rounded-lg bg-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            ))
          : hours.map((hour) => (
              <div
                key={hour}
                className="grid h-12 grid-cols-[56px_repeat(7,1fr)] md:h-16 md:grid-cols-[74px_repeat(7,1fr)]"
              >
                {/* Hour label */}
                <div className="relative -bottom-2 flex items-end justify-end pt-1 pr-2 text-sm font-medium text-[#717680] md:justify-center md:text-base">
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
                      className={`cursor-pointer overflow-hidden border-b border-l border-gray-100 p-0.5 transition-colors md:border-gray-300 ${
                        isSelected
                          ? "ring-2 ring-[#12B76A] ring-inset"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {slotReservations.map((r) => (
                        <div
                          key={r.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot({ day, hour, reservation: r });
                          }}
                          className={`mb-0.5 h-full rounded-lg px-1.5 py-1 text-[10px] md:text-xs ${r.is_paid ? "bg-[#12B76A] text-white" : "bg-gray-400 text-gray-600"}`}
                        >
                          <p className="truncate leading-tight font-semibold">
                            {r.customer_name}
                          </p>
                          <p className="hidden leading-tight font-semibold opacity-80 md:block">
                            {r.start_time.slice(0, 5)} -{" "}
                            {r.end_time.slice(0, 5)}
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
        className="fixed right-6 bottom-6 z-40 flex h-9 w-9 items-center justify-center rounded-xl bg-[#12B76A] text-xl text-white shadow-md transition-colors hover:bg-[#12B76A] md:hidden"
      >
        +
      </button>
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={closeMenu} />
          <div className="animate-slide-up relative w-full rounded-t-2xl bg-white shadow-xl will-change-[transform,opacity] md:max-h-[90vh] md:max-w-lg md:overflow-hidden md:rounded-2xl">
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
              defaultPrice={selectedField?.default_price}
            />
          </div>
        </div>
      )}
    </div>
  );
}
