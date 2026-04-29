"use client";

import { dbTimeToMinutes, generateTimeSlots, minutesToTimeString } from "@/lib/constants";
import {
  reservationSchema,
  ReservationFormData,
} from "@/lib/schemas/reservationSchema";
import {
  subscriptionSchema,
  SubscriptionFormData,
} from "@/lib/schemas/subscriptionSchema";
import { Slot } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  AlignLeft,
  CalendarDays,
  Clock,
  CreditCard,
  Phone,
  Repeat,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const DAY_OPTIONS = [
  { value: 0, label: "Pazar" },
  { value: 1, label: "Pazartesi" },
  { value: 2, label: "Salı" },
  { value: 3, label: "Çarşamba" },
  { value: 4, label: "Perşembe" },
  { value: 5, label: "Cuma" },
  { value: 6, label: "Cumartesi" },
];

interface ReservationMenuProps {
  slot: Slot;
  onClose: () => void;
  onSave: (data: ReservationFormData & { date: Date }) => void;
  isLoading?: boolean;
  error?: string | null;
  onDelete?: () => void;
  isDeleting?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  isApproving?: boolean;
  isRejecting?: boolean;
  defaultPrice?: number;
  fieldStartHour?: number;
  fieldEndHour?: number;
  // Subscription props
  onSaveSubscription?: (data: SubscriptionFormData) => void;
  isCreatingSubscription?: boolean;
  subscriptionError?: string | null;
  // Pre-fill data carried over from QuickCreateSheet
  prefillData?: { customerName: string; phone?: string; price: string };
  onCancelSubscription?: () => void;
  isCancellingSubscription?: boolean;
}

export function ReservationMenu({
  slot,
  onClose,
  onSave,
  isLoading,
  error,
  onDelete,
  isDeleting,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
  defaultPrice,
  fieldStartHour = 11,
  fieldEndHour = 0,
  onSaveSubscription,
  isCreatingSubscription,
  subscriptionError,
  prefillData,
  onCancelSubscription,
  isCancellingSubscription,
}: ReservationMenuProps) {
  const { startSlots, endSlots } = generateTimeSlots(fieldStartHour, fieldEndHour);

  const isPending = slot.reservation?.status === "pending";

  // Mode toggle — only relevant when creating (no existing reservation)
  const [mode, setMode] = useState<"single" | "subscription">("single");
  const [confirmCancel, setConfirmCancel] = useState(false);

  // ── Single-reservation form ──────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: slot.reservation?.customer_name ?? prefillData?.customerName ?? "",
      phone: slot.reservation?.customer_phone ?? prefillData?.phone ?? "",
      startTime: slot.reservation
        ? dbTimeToMinutes(slot.reservation.start_time)
        : slot.hour === 0
          ? 1380
          : (slot.hour - 1) * 60,
      endTime: slot.reservation
        ? dbTimeToMinutes(slot.reservation.end_time)
        : slot.hour * 60,
      description: slot.reservation?.description ?? "",
      price:
        slot.reservation?.price?.toString() ??
        prefillData?.price ??
        defaultPrice?.toString() ??
        "",
      isPaid: slot.reservation?.is_paid ?? false,
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const isPaid = watch("isPaid");

  const [selectedDate, setSelectedDate] = useState<Date>(slot.day);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formattedDate = format(selectedDate, "d MMMM, EEEE", {
    locale: tr,
  });

  const onSubmit = (data: ReservationFormData) => {
    onSave({ ...data, date: selectedDate });
  };

  // ── Subscription form ────────────────────────────────────────────────────
  const {
    register: regSub,
    handleSubmit: handleSubSubmit,
    watch: watchSub,
    setValue: setSubValue,
    formState: { errors: subErrors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      dayOfWeek: slot.day.getDay(),
      startTime: slot.hour === 0 ? 1380 : (slot.hour - 1) * 60,
      endTime: slot.hour * 60,
      price: defaultPrice?.toString() ?? "",
      description: "",
    },
  });

  const subStartTime = watchSub("startTime");
  const subEndTime = watchSub("endTime");
  const subDayOfWeek = watchSub("dayOfWeek");

  const onSubscriptionSubmit = (data: SubscriptionFormData) => {
    onSaveSubscription?.(data);
  };

  // ── Header actions ───────────────────────────────────────────────────────
  const renderHeader = () => {
    // Editing an existing reservation
    if (slot.reservation) {
      return (
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-sm font-medium text-gray-500"
          >
            Vazgeç
          </button>
          <div className="flex items-center gap-5">
            {isPending ? (
              <>
                <button
                  type="button"
                  onClick={onReject}
                  disabled={isRejecting || isApproving}
                  className="cursor-pointer text-sm font-semibold text-red-500 disabled:opacity-50"
                >
                  {isRejecting ? "Reddediliyor..." : "Reddet"}
                </button>
                <button
                  type="button"
                  onClick={onApprove}
                  disabled={isApproving || isRejecting}
                  className="cursor-pointer text-sm font-semibold text-green-600 disabled:opacity-50"
                >
                  {isApproving ? "Onaylanıyor..." : "Onayla"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="cursor-pointer text-sm font-semibold text-red-500 disabled:opacity-50"
                >
                  {isDeleting
                    ? "Siliniyor..."
                    : slot.reservation?.subscription_id
                      ? "Bu Seansı Sil"
                      : "Sil"}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer text-sm font-semibold text-green-600 disabled:opacity-50"
                >
                  {isLoading ? "Kaydediliyor..." : "Güncelle"}
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    // Creating — single mode
    if (mode === "single") {
      return (
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-sm font-medium text-gray-500"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-sm font-semibold text-green-600 disabled:opacity-50"
          >
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      );
    }

    // Creating — subscription mode
    return (
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-sm font-medium text-gray-500"
        >
          Vazgeç
        </button>
        <button
          type="submit"
          disabled={isCreatingSubscription}
          className="cursor-pointer text-sm font-semibold text-indigo-600 disabled:opacity-50"
        >
          {isCreatingSubscription ? "Oluşturuluyor..." : "Abonelik Oluştur"}
        </button>
      </div>
    );
  };

  // ── Subscription badge (shown when editing a subscription reservation) ───
  const subscriptionBadge = slot.reservation?.subscription_id ? (
    <div className="mx-4 mt-3 flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5">
      <Repeat className="h-3.5 w-3.5 text-indigo-400" />
      <span className="text-xs font-medium text-indigo-600">
        Abonelik Rezervasyonu
      </span>
    </div>
  ) : null;

  // ── Single-reservation form body ─────────────────────────────────────────
  const singleFormBody = (
    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="mt-4 mb-3 text-sm font-semibold text-green-600">
        Rezervasyon Bilgileri
      </p>

      {/* Name */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 shrink-0 text-gray-400" />
          <input
            {...register("customerName")}
            type="text"
            placeholder="Ad & Soyad"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>
        {errors.customerName && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {errors.customerName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 shrink-0 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">+90</span>
          <input
            {...register("phone")}
            type="tel"
            placeholder="--- --- -- --"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Date */}
      <div className="flex items-center gap-3 border-b border-gray-100 py-3">
        <CalendarDays className="h-5 w-5 shrink-0 text-gray-400" />
        {slot.reservation ? (
          <span className="text-sm font-medium text-gray-800">
            {formattedDate}
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={() => dateInputRef.current?.showPicker()}
              className="cursor-pointer text-sm font-medium text-gray-800"
            >
              {formattedDate}
            </button>
            <input
              ref={dateInputRef}
              type="date"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={(e) => {
                if (e.target.value)
                  setSelectedDate(new Date(e.target.value + "T12:00:00"));
              }}
              className="sr-only"
            />
          </>
        )}
      </div>

      {/* Time */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 shrink-0 text-gray-400" />
          <select
            value={startTime}
            onChange={(e) =>
              setValue("startTime", Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="text-sm font-medium text-gray-800 outline-none"
          >
            {startSlots.map((m) => (
              <option key={m} value={m}>
                {minutesToTimeString(m)}
              </option>
            ))}
          </select>
          <span className="text-gray-300">|</span>
          <select
            value={endTime}
            onChange={(e) =>
              setValue("endTime", Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="text-sm font-medium text-gray-800 outline-none"
          >
            {endSlots.map((m) => (
              <option key={m} value={m}>
                {minutesToTimeString(m)}
              </option>
            ))}
          </select>
        </div>
        {errors.endTime && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {errors.endTime.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex items-start gap-3 border-b border-gray-100 py-3">
        <AlignLeft className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
        <textarea
          {...register("description")}
          placeholder="Açıklama Ekle"
          rows={1}
          className="flex-1 resize-none text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      <p className="mt-5 mb-3 text-sm font-semibold text-green-600">
        Ödeme Bilgileri
      </p>

      {/* Price + isPaid */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 shrink-0 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">₺</span>
          <input
            {...register("price")}
            type="number"
            placeholder="0"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) =>
                setValue("isPaid", e.target.checked, { shouldValidate: true })
              }
              className="h-4 w-4 rounded border-gray-300 accent-green-500"
            />
            Ödendi
          </label>
        </div>
        {errors.price && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>
    </div>
  );

  // ── Subscription form body ───────────────────────────────────────────────
  const subscriptionFormBody = (
    <div className="flex-1 overflow-y-auto px-4 pb-6">
      <p className="mt-4 mb-3 text-sm font-semibold text-indigo-600">
        Abonelik Bilgileri
      </p>

      {/* Name */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 shrink-0 text-gray-400" />
          <input
            {...regSub("customerName")}
            type="text"
            placeholder="Ad & Soyad"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>
        {subErrors.customerName && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {subErrors.customerName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 shrink-0 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">+90</span>
          <input
            {...regSub("phone")}
            type="tel"
            placeholder="--- --- -- --"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>
        {subErrors.phone && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {subErrors.phone.message}
          </p>
        )}
      </div>

      {/* Day of week */}
      <div className="flex items-center gap-3 border-b border-gray-100 py-3">
        <Repeat className="h-5 w-5 shrink-0 text-gray-400" />
        <select
          value={subDayOfWeek}
          onChange={(e) =>
            setSubValue("dayOfWeek", Number(e.target.value), {
              shouldValidate: true,
            })
          }
          className="flex-1 text-sm font-medium text-gray-800 outline-none"
        >
          {DAY_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              Her {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Time range */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 shrink-0 text-gray-400" />
          <select
            value={subStartTime}
            onChange={(e) =>
              setSubValue("startTime", Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="text-sm font-medium text-gray-800 outline-none"
          >
            {startSlots.map((m) => (
              <option key={m} value={m}>
                {minutesToTimeString(m)}
              </option>
            ))}
          </select>
          <span className="text-gray-300">|</span>
          <select
            value={subEndTime}
            onChange={(e) =>
              setSubValue("endTime", Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="text-sm font-medium text-gray-800 outline-none"
          >
            {endSlots.map((m) => (
              <option key={m} value={m}>
                {minutesToTimeString(m)}
              </option>
            ))}
          </select>
        </div>
        {subErrors.endTime && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {subErrors.endTime.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex items-start gap-3 border-b border-gray-100 py-3">
        <AlignLeft className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
        <textarea
          {...regSub("description")}
          placeholder="Açıklama Ekle"
          rows={1}
          className="flex-1 resize-none text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      <p className="mt-5 mb-3 text-sm font-semibold text-indigo-600">
        Ödeme Bilgileri
      </p>

      {/* Price per session (always created as unpaid) */}
      <div className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 shrink-0 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">₺</span>
          <input
            {...regSub("price")}
            type="number"
            placeholder="0"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
          <span className="text-xs text-gray-400">/seans</span>
        </div>
        {subErrors.price && (
          <p className="mt-1 ml-8 text-xs text-red-500">
            {subErrors.price.message}
          </p>
        )}
      </div>
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────

  // Editing an existing reservation — use the single form
  if (slot.reservation) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col bg-white"
      >
        {renderHeader()}
        {subscriptionBadge}
        {error && <p className="px-4 pt-2 text-xs text-red-500">{error}</p>}
        {singleFormBody}
        {slot.reservation.subscription_id && onCancelSubscription && (
          <div className="shrink-0 border-t border-gray-100 px-4 py-3">
            {confirmCancel ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-500">
                  Bugünden itibaren tüm gelecekteki seanslar silinecek. Emin misiniz?
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setConfirmCancel(false)}
                    className="cursor-pointer text-sm font-medium text-gray-500"
                  >
                    Hayır
                  </button>
                  <button
                    type="button"
                    onClick={onCancelSubscription}
                    disabled={isCancellingSubscription}
                    className="cursor-pointer text-sm font-semibold text-red-500 disabled:opacity-50"
                  >
                    {isCancellingSubscription ? "Sonlandırılıyor..." : "Evet, Sonlandır"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmCancel(true)}
                className="cursor-pointer text-sm font-medium text-red-400"
              >
                Aboneliği Sonlandır
              </button>
            )}
          </div>
        )}
      </form>
    );
  }

  // Creating — subscription mode
  if (mode === "subscription") {
    return (
      <form
        onSubmit={handleSubSubmit(onSubscriptionSubmit)}
        className="flex h-full flex-col bg-white"
      >
        {renderHeader()}

        {/* Tab toggle */}
        <div className="flex border-b border-gray-100 px-4">
          <button
            type="button"
            onClick={() => setMode("single")}
            className="pb-2 text-sm font-medium text-gray-400"
          >
            Tek Seferlik
          </button>
          <button
            type="button"
            onClick={() => setMode("subscription")}
            className="ml-4 border-b-2 border-indigo-500 pb-2 text-sm font-medium text-indigo-600"
          >
            Abonelik
          </button>
        </div>

        {subscriptionError && (
          <p className="px-4 pt-2 text-xs text-red-500">{subscriptionError}</p>
        )}
        {subscriptionFormBody}
      </form>
    );
  }

  // Creating — single mode (default)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col bg-white"
    >
      {renderHeader()}

      {/* Tab toggle */}
      <div className="flex border-b border-gray-100 px-4">
        <button
          type="button"
          onClick={() => setMode("single")}
          className="border-b-2 border-green-600 pb-2 text-sm font-medium text-green-600"
        >
          Tek Seferlik
        </button>
        <button
          type="button"
          onClick={() => setMode("subscription")}
          className="ml-4 pb-2 text-sm font-medium text-gray-400"
        >
          Abonelik
        </button>
      </div>

      {error && <p className="px-4 pt-2 text-xs text-red-500">{error}</p>}
      {singleFormBody}
    </form>
  );
}
