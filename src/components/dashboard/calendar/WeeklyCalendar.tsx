import { dbTimeToMinutes } from "@/lib/constants";
import { useCalendar } from "@/lib/hooks/dashboard/useCalendar";
import { useSubscriptions } from "@/lib/hooks/dashboard/useSubscriptions";
import { Reservation } from "@/types";
import { format, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { ReservationMenu } from "./ReservationMenu";
import { SubscriptionPanel } from "./SubscriptionPanel";
import Button from "@/components/Button";
import { Lock, Plus, Repeat } from "lucide-react";

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
    isHourClosed,
    refetch,
    createReservation,
    isLoading,
    error,
    updateReservation,
    isUpdating,
    updateError,
    deleteReservation,
    isDeleting,
    deleteError,
    approveReservation,
    rejectReservation,
    isApprovingId,
    isRejectingId,
    statusError,
    closeMenu,
  } = useCalendar();

  const {
    subscriptions,
    isLoading: subscriptionLoading,
    error: subscriptionError,
    clearError: clearSubscriptionError,
    createSubscription,
    cancelSubscription,
    isCancelling,
  } = useSubscriptions();

  const [today, setToday] = useState<Date | null>(null);
  const [showSubscriptionPanel, setShowSubscriptionPanel] = useState(false);

  useEffect(() => {
    setToday(new Date());
  }, []);
  const checkIsToday = (day: Date) => today !== null && isSameDay(day, today);

  useEffect(() => {
    document.body.style.overflow =
      selectedSlot || showSubscriptionPanel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSlot, showSubscriptionPanel]);

  const gridStartMin = (hours[0] === 0 ? 23 : hours[0] - 1) * 60;
  const totalGridMinutes = hours.length * 60;

  const getPillStyle = (r: Reservation) => {
    const startMin = dbTimeToMinutes(r.start_time);
    const rawEnd = dbTimeToMinutes(r.end_time);
    const visualGridStart = (hours[0] - 1) * 60;
    const normStart = startMin < visualGridStart ? startMin + 1440 : startMin;
    let normEnd = rawEnd <= startMin ? rawEnd + 1440 : rawEnd;
    if (normEnd < normStart) normEnd += 1440;
    return {
      top: `${((normStart - gridStartMin) / totalGridMinutes) * 100}%`,
      height: `${((normEnd - normStart) / totalGridMinutes) * 100}%`,
    };
  };

  const handleCloseMenu = () => {
    closeMenu();
    clearSubscriptionError();
  };

  const handleSaveSubscription = async (
    data: Parameters<typeof createSubscription>[0],
  ) => {
    const success = await createSubscription(data);
    if (success) {
      handleCloseMenu();
      refetch();
    }
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden border-t border-r border-l border-gray-200 bg-white md:rounded-xl">
      <div className="flex items-center gap-1.5 px-3 py-2 md:gap-2">
        {/* Abonelikler — desktop only */}
        <Button
          variant="secondary"
          onClick={() => setShowSubscriptionPanel(true)}
          className="hidden min-w-0 shrink gap-1 px-2.5 py-1.5 text-sm md:inline-flex"
        >
          <Repeat className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Abonelikler</span>
          {subscriptions.length > 0 && (
            <span className="shrink-0 rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600">
              {subscriptions.length}
            </span>
          )}
        </Button>

        {/* Prev */}
        <Button
          variant="secondary"
          onClick={prevWeek}
          className="shrink-0 px-2.5 py-2"
        >
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

        {/* Center */}
        <div className="flex min-w-0 flex-1 flex-col items-center">
          <p className="w-full truncate text-center font-medium md:text-lg">
            {format(weekDays[0], "d MMMM", { locale: tr })} -{" "}
            {format(weekDays[6], "d MMMM", { locale: tr })}
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-center text-xs text-gray-400 md:text-lg">
              {reservations.length} rezervasyon
            </p>
            {reservations.filter((r) => r.status === "pending").length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 md:text-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {reservations.filter((r) => r.status === "pending").length} onay
                bekliyor
              </span>
            )}
            {reservations.filter((r) => r.subscription_id).length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 md:text-xs">
                <Repeat className="h-2.5 w-2.5 shrink-0" />
                {reservations.filter((r) => r.subscription_id).length} abonelik
              </span>
            )}
          </div>
          {/* Subscriptions button — mobile only */}
          <button
            onClick={() => setShowSubscriptionPanel(true)}
            className="mt-1 flex items-center gap-1 text-xs font-medium text-indigo-500 md:hidden"
          >
            <Repeat className="h-3 w-3 shrink-0" />
            Abonelikler
            {subscriptions.length > 0 && (
              <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700">
                {subscriptions.length}
              </span>
            )}
          </button>
        </div>

        {/* Next */}
        <Button
          variant="secondary"
          onClick={nextWeek}
          className="shrink-0 px-2.5 py-2"
        >
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

        {/* Rezervasyon Oluştur — desktop only */}
        <Button
          onClick={() => setSelectedSlot({ day: new Date(), hour: 12 })}
          className="hidden min-w-0 shrink gap-1 px-2.5 py-1.5 text-sm md:inline-flex"
        >
          <Plus className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Rezervasyon Oluştur</span>
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
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="text-xs text-gray-500">Onay Bekliyor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Repeat className="h-2.5 w-2.5 text-gray-400" />
          <span className="text-xs text-gray-500">Abonelik</span>
        </div>
      </div>

      {/* Week header */}
      <div className="grid shrink-0 grid-cols-[56px_repeat(7,1fr)] border-b border-gray-200 bg-white md:grid-cols-[74px_repeat(7,1fr)] md:border-gray-300">
        <div></div>
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="flex items-center justify-center py-2 md:py-3"
          >
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

      {/* Time slot rows */}
      <div className="flex-1 overflow-y-auto">
        {isFetching ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="grid h-12 grid-cols-[56px_repeat(7,1fr)] md:h-16 md:grid-cols-[74px_repeat(7,1fr)]"
            >
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
        ) : (
          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="grid h-12 grid-cols-[56px_repeat(7,1fr)] md:h-16 md:grid-cols-[74px_repeat(7,1fr)]"
              >
                <div className="relative -bottom-2 flex items-end justify-end pt-1 pr-2 text-sm font-medium text-[#717680] md:justify-center md:text-base">
                  {String(hour).padStart(2, "0")}:00
                </div>

                {weekDays.map((day, di) => {
                  const closed = isHourClosed(day, hour);
                  const isSelected =
                    selectedSlot &&
                    isSameDay(selectedSlot.day, day) &&
                    selectedSlot.hour === hour;

                  if (closed) {
                    return (
                      <div
                        key={di}
                        className="flex items-center justify-center border-b border-l border-gray-100 bg-gray-100 p-0.5 md:border-gray-300"
                      >
                        <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400 md:text-xs">
                          <Lock className="h-3 w-3" />
                          <span className="hidden md:inline">Kapalı</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={di}
                      onClick={() => setSelectedSlot({ day, hour })}
                      className={`cursor-pointer border-b border-l border-gray-100 transition-colors md:border-gray-300 ${
                        isSelected
                          ? "ring-2 ring-[#12B76A] ring-inset"
                          : "hover:bg-gray-50"
                      }`}
                    />
                  );
                })}
              </div>
            ))}

            {/* Pill overlay — renders all reservation pills as a single layer so
                  half-hour reservations appear as one continuous block */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-[56px_repeat(7,1fr)] md:grid-cols-[74px_repeat(7,1fr)]">
              <div />
              {weekDays.map((day, di) => (
                <div key={di} className="relative">
                  {reservations
                    .filter(
                      (r) => r.reservation_date === format(day, "yyyy-MM-dd"),
                    )
                    .map((r) => {
                      const isPending = r.status === "pending";
                      const isSubscription = !!r.subscription_id;
                      const startHour =
                        (Math.floor(dbTimeToMinutes(r.start_time) / 60) + 1) %
                        24;
                      return (
                        <div
                          key={r.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot({
                              day,
                              hour: startHour,
                              reservation: r,
                            });
                          }}
                          style={getPillStyle(r)}
                          className={`pointer-events-auto absolute right-0.5 left-0.5 overflow-hidden rounded-lg px-1.5 py-1 text-[10px] md:text-xs ${
                            isPending
                              ? "bg-amber-400 text-white"
                              : r.is_paid
                                ? "bg-[#12B76A] text-white"
                                : "bg-gray-400 text-gray-600"
                          }`}
                        >
                          {isPending && (
                            <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-white" />
                          )}
                          {isSubscription && !isPending && (
                            <Repeat className="absolute right-0.5 bottom-0.5 h-2.5 w-2.5 opacity-60" />
                          )}
                          <p className="truncate leading-tight font-semibold">
                            {r.customer_name}
                          </p>
                          <p className="hidden leading-tight font-semibold opacity-80 md:block">
                            {r.start_time.slice(0, 5)} -{" "}
                            {r.end_time.slice(0, 5)}
                          </p>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile add button */}
      <button
        onClick={() => setSelectedSlot({ day: new Date(), hour: hours[0] })}
        className="fixed right-6 bottom-6 z-40 flex h-9 w-9 items-center justify-center rounded-xl bg-[#12B76A] text-xl text-white shadow-md transition-colors hover:bg-[#12B76A] md:hidden"
      >
        +
      </button>

      {/* Reservation menu overlay */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={handleCloseMenu}
          />
          <div className="animate-slide-up relative w-full rounded-t-2xl bg-white shadow-xl will-change-[transform,opacity] md:max-h-[90vh] md:max-w-lg md:overflow-hidden md:rounded-2xl">
            <ReservationMenu
              slot={selectedSlot}
              onClose={handleCloseMenu}
              onSave={
                selectedSlot.reservation
                  ? (data) =>
                      updateReservation(selectedSlot.reservation!.id, data)
                  : createReservation
              }
              isLoading={isLoading || isUpdating}
              error={error ?? updateError ?? deleteError ?? statusError}
              onDelete={
                selectedSlot.reservation
                  ? () => deleteReservation(selectedSlot.reservation!.id)
                  : undefined
              }
              isDeleting={isDeleting}
              onApprove={
                selectedSlot.reservation
                  ? () => approveReservation(selectedSlot.reservation!.id)
                  : undefined
              }
              onReject={
                selectedSlot.reservation
                  ? () => rejectReservation(selectedSlot.reservation!.id)
                  : undefined
              }
              isApproving={isApprovingId === selectedSlot.reservation?.id}
              isRejecting={isRejectingId === selectedSlot.reservation?.id}
              defaultPrice={selectedField?.default_price}
              fieldStartHour={selectedField?.start_hour}
              fieldEndHour={selectedField?.end_hour}
              onSaveSubscription={handleSaveSubscription}
              isCreatingSubscription={subscriptionLoading}
              subscriptionError={subscriptionError}
            />
          </div>
        </div>
      )}

      {/* Subscription panel overlay */}
      {showSubscriptionPanel && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowSubscriptionPanel(false)}
          />
          <div className="animate-slide-up relative w-full rounded-t-2xl bg-white shadow-xl will-change-[transform,opacity] md:max-h-[90vh] md:max-w-lg md:overflow-hidden md:rounded-2xl">
            <SubscriptionPanel
              subscriptions={subscriptions}
              isLoading={subscriptionLoading}
              onCancel={async (id) => {
                await cancelSubscription(id);
                refetch();
              }}
              isCancelling={isCancelling}
              onClose={() => setShowSubscriptionPanel(false)}
              error={subscriptionError}
            />
          </div>
        </div>
      )}
    </div>
  );
}
