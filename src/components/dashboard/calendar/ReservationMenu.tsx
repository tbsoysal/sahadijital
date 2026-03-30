"use client";

import { RESERVATION_START_HOURS, WORKING_END_HOURS } from "@/lib/constants";
import {
  reservationSchema,
  ReservationFormData,
} from "@/lib/schemas/reservationSchema";
import { Slot } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { tr } from "date-fns/locale";
import { useForm } from "react-hook-form";

interface ReservationMenuProps {
  slot: Slot;
  onClose: () => void;
  onSave: (data: ReservationFormData & { date: Date }) => void;
  isLoading?: boolean;
  error?: string | null;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

const label = "text-xs font-medium text-gray-400 w-8 shrink-0";

export function ReservationMenu({
  slot,
  onClose,
  onSave,
  isLoading,
  error,
  onDelete,
  isDeleting,
}: ReservationMenuProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: slot.reservation?.customer_name ?? "",
      phone: slot.reservation?.customer_phone ?? "",
      startTime: slot.reservation
        ? parseInt(slot.reservation.start_time)
        : slot.hour === 0
          ? 23
          : slot.hour - 1,
      endTime: slot.reservation
        ? parseInt(slot.reservation.end_time)
        : slot.hour,
      description: slot.reservation?.description ?? "",
      price: slot.reservation?.price?.toString() ?? "",
      isPaid: slot.reservation?.is_paid ?? false,
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const isPaid = watch("isPaid");

  const resolveDate = (hour: number) =>
    hour === 0 ? addDays(slot.day, 1) : slot.day;

  const formattedDate = format(resolveDate(startTime), "d MMMM, EEEE", {
    locale: tr,
  });

  const onSubmit = (data: ReservationFormData) => {
    onSave({ ...data, date: resolveDate(data.startTime) });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col bg-white"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-sm font-medium text-gray-500"
        >
          Vazgeç
        </button>
        <div className="flex items-center gap-5">
          {slot.reservation && (
            <button
              type="button"
              onClick={onDelete}
              disabled={isDeleting}
              className="cursor-pointer text-sm font-semibold text-red-500 disabled:opacity-50"
            >
              {isDeleting ? "Siliniyor..." : "Sil"}
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-sm font-semibold text-green-600 disabled:opacity-50"
          >
            {isLoading
              ? "Kaydediliyor..."
              : slot.reservation
                ? "Güncelle"
                : "Kaydet"}
          </button>
        </div>
      </div>

      {error && <p className="px-4 pt-2 text-xs text-red-500">{error}</p>}

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex items-center gap-3 border-b border-gray-100 py-3">
          <span className={label}>Ad</span>
          <input
            {...register("customerName")}
            type="text"
            placeholder="Ad & Soyad"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>
        {errors.customerName && (
          <p className="pt-1 pb-1 pl-11 text-xs text-red-500">
            {errors.customerName.message}
          </p>
        )}

        <div className="flex items-center gap-3 border-b border-gray-100 py-3">
          <span className={label}>Tel</span>
          <span className="text-sm font-medium text-gray-700">+90</span>
          <input
            {...register("phone")}
            type="tel"
            placeholder="--- --- -- --"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>
        {errors.phone && (
          <p className="pt-1 pb-1 pl-11 text-xs text-red-500">
            {errors.phone.message}
          </p>
        )}

        <div className="flex items-center gap-3 border-b border-gray-100 py-3">
          <span className={label}>Tarih</span>
          <span className="text-sm font-medium text-gray-800">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-3 border-b border-gray-100 py-3">
          <span className={label}>Saat</span>
          <select
            value={startTime}
            onChange={(e) =>
              setValue("startTime", Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="text-sm font-medium text-gray-800 outline-none"
          >
            {RESERVATION_START_HOURS.map((h) => (
              <option key={h} value={h}>
                {formatHour(h)}
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
            {WORKING_END_HOURS.map((h) => (
              <option key={h} value={h}>
                {formatHour(h)}
              </option>
            ))}
          </select>
        </div>
        {errors.endTime && (
          <p className="pt-1 pb-1 pl-11 text-xs text-red-500">
            {errors.endTime.message}
          </p>
        )}

        <div className="flex items-start gap-3 border-b border-gray-100 py-3">
          <span className={`${label} mt-0.5`}>Not</span>
          <textarea
            {...register("description")}
            placeholder="Açıklama Ekle"
            rows={1}
            className="flex-1 resize-none text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 border-b border-gray-100 py-3">
          <span className={label}>Ücret</span>
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
          <p className="pt-1 pb-1 pl-11 text-xs text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>
    </form>
  );
}
