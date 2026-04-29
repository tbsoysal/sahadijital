"use client";

import { minutesToTimeString } from "@/lib/constants";
import { SubscriptionFormData } from "@/lib/schemas/subscriptionSchema";
import { Slot } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CreditCard, Phone, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const quickSchema = z.object({
  customerName: z
    .string()
    .min(2, "Müşteri adı en az 2 karakter olmalı")
    .max(100, "Müşteri adı çok uzun"),
  phone: z
    .string()
    .max(15, "Telefon numarası geçersiz")
    .regex(/^[0-9\s-]*$/, "Geçerli bir telefon numarası girin")
    .optional()
    .or(z.literal("")),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Geçerli bir fiyat girin")
    .refine((val) => parseFloat(val) >= 0, "Fiyat negatif olamaz"),
});

type QuickFormData = z.infer<typeof quickSchema>;

export interface QuickPrefill {
  customerName: string;
  phone?: string;
  price: string;
}

interface QuickCreateSheetProps {
  slot: Slot;
  onClose: () => void;
  onSave: (data: QuickFormData & { date: Date; startTime: number; endTime: number; description: string; isPaid: boolean }) => void;
  onSaveSubscription?: (data: SubscriptionFormData) => void;
  onExpand: (partial: QuickPrefill) => void;
  isLoading?: boolean;
  isCreatingSubscription?: boolean;
  error?: string | null;
  subscriptionError?: string | null;
  defaultPrice?: number;
}

export function QuickCreateSheet({
  slot,
  onClose,
  onSave,
  onSaveSubscription,
  onExpand,
  isLoading,
  isCreatingSubscription,
  error,
  subscriptionError,
  defaultPrice,
}: QuickCreateSheetProps) {
  const startMin = slot.hour === 0 ? 1380 : (slot.hour - 1) * 60;
  const endMin = slot.hour * 60;
  const startStr = minutesToTimeString(startMin);
  const endStr = minutesToTimeString(endMin);
  const dateStr = format(slot.day, "d MMMM, EEEE", { locale: tr });

  const [mode, setMode] = useState<"single" | "subscription">("single");

  const nameRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<QuickFormData>({
    resolver: zodResolver(quickSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      price: defaultPrice?.toString() ?? "",
    },
  });

  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  const { ref: nameFormRef, ...nameRest } = register("customerName");

  const onSubmitSingle = (data: QuickFormData) => {
    onSave({
      ...data,
      date: slot.day,
      startTime: startMin,
      endTime: endMin,
      description: "",
      isPaid: false,
    });
  };

  const onSubmitSubscription = (data: QuickFormData) => {
    onSaveSubscription?.({
      customerName: data.customerName,
      phone: data.phone,
      dayOfWeek: slot.day.getDay(),
      startTime: startMin,
      endTime: endMin,
      price: data.price,
      description: "",
    });
  };

  const handleSave = handleSubmit(
    mode === "single" ? onSubmitSingle : onSubmitSubscription,
  );

  const handleExpand = () => {
    const { customerName, phone, price } = getValues();
    onExpand({ customerName, phone, price });
  };

  const isBusy = isLoading || isCreatingSubscription;
  const activeError = mode === "single" ? error : subscriptionError;

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-sm font-medium text-gray-500"
        >
          İptal
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isBusy}
          className="cursor-pointer rounded-lg bg-[#12B76A] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isBusy
            ? "Kaydediliyor..."
            : mode === "subscription"
              ? "Abonelik Oluştur"
              : "Kaydet"}
        </button>
      </div>

      {/* Tab toggle */}
      <div className="flex shrink-0 border-b border-gray-100 px-4">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`cursor-pointer pb-2 pr-4 text-sm font-medium transition-colors ${
            mode === "single"
              ? "border-b-2 border-[#12B76A] text-[#12B76A]"
              : "text-gray-400"
          }`}
        >
          Tek Seferlik
        </button>
        <button
          type="button"
          onClick={() => setMode("subscription")}
          className={`cursor-pointer pb-2 pr-4 text-sm font-medium transition-colors ${
            mode === "subscription"
              ? "border-b-2 border-indigo-500 text-indigo-500"
              : "text-gray-400"
          }`}
        >
          Abonelik
        </button>
      </div>

      {/* Time + date display */}
      <div className="px-4 pt-3 pb-4">
        <p className="text-xl font-bold text-gray-900">
          {startStr} – {endStr}
        </p>
        <p className="text-sm text-gray-400">
          {mode === "subscription"
            ? `Her ${format(slot.day, "EEEE", { locale: tr })}`
            : dateStr}
        </p>
      </div>

      {activeError && (
        <p className="px-4 pb-2 text-xs text-red-500">{activeError}</p>
      )}

      {/* Fields */}
      <div className="divide-y divide-gray-100 border-t border-gray-100">
        {/* Customer name */}
        <div className="flex items-center gap-3 px-4 py-3">
          <User className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex-1">
            <input
              {...nameRest}
              ref={(el) => {
                nameFormRef(el);
                (nameRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }}
              type="text"
              placeholder="Müşteri adı"
              className="w-full text-sm outline-none placeholder:text-gray-400"
            />
            {errors.customerName && (
              <p className="mt-0.5 text-[11px] text-red-500">{errors.customerName.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Phone className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-1 items-center gap-1">
            <span className="shrink-0 text-sm text-gray-500">+90</span>
            <div className="flex-1">
              <input
                {...register("phone")}
                type="tel"
                inputMode="numeric"
                placeholder="5xx xxx xx xx"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
              {errors.phone && (
                <p className="mt-0.5 text-[11px] text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 px-4 py-3">
          <CreditCard className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-1 items-center gap-1">
            <span className="shrink-0 text-sm text-gray-500">
              {mode === "subscription" ? "₺/seans" : "₺"}
            </span>
            <div className="flex-1">
              <input
                {...register("price")}
                type="text"
                inputMode="decimal"
                placeholder="0"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
              {errors.price && (
                <p className="mt-0.5 text-[11px] text-red-500">{errors.price.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand to full form */}
      <button
        type="button"
        onClick={handleExpand}
        className="cursor-pointer px-4 py-4 text-left text-sm font-medium text-[#12B76A]"
      >
        Daha Fazla Seçenek →
      </button>
    </div>
  );
}
