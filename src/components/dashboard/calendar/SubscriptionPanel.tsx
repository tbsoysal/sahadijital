"use client";

import { Subscription } from "@/types";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Phone, Repeat, User } from "lucide-react";
import { useState } from "react";

const DAY_NAMES = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

interface SubscriptionPanelProps {
  subscriptions: Subscription[];
  isLoading: boolean;
  onCancel: (id: string) => Promise<void>;
  isCancelling: string | null;
  onClose: () => void;
  error: string | null;
}

export function SubscriptionPanel({
  subscriptions,
  isLoading,
  onCancel,
  isCancelling,
  onClose,
  error,
}: SubscriptionPanelProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    await onCancel(id);
    setConfirmingId(null);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-base font-semibold text-gray-800">Abonelikler</h2>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-sm font-medium text-gray-500"
        >
          Kapat
        </button>
      </div>

      {error && <p className="px-4 pt-1 text-xs text-red-500">{error}</p>}

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {isLoading ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <Repeat className="h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-400">Aktif abonelik bulunmuyor</p>
            <p className="text-xs text-gray-300">
              Rezervasyon oluştururken &quot;Abonelik&quot; sekmesini kullanın
            </p>
          </div>
        ) : (
          <ul className="mt-3 space-y-3">
            {subscriptions.map((sub) => (
              <li
                key={sub.id}
                className="rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {/* Customer name */}
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      <span className="truncate text-sm font-semibold text-gray-800">
                        {sub.customer_name}
                      </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {sub.customer_phone}
                      </span>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-2">
                      <Repeat className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
                      <span className="text-xs text-gray-600">
                        Her {DAY_NAMES[sub.day_of_week]},{" "}
                        {sub.start_time.slice(0, 5)}–{sub.end_time.slice(0, 5)}
                      </span>
                    </div>

                    {/* End date + price */}
                    <p className="text-xs text-gray-400">
                      {format(
                        new Date(sub.end_date + "T12:00:00"),
                        "d MMMM yyyy",
                        { locale: tr },
                      )}{" "}
                      tarihine kadar · ₺{sub.price_per_session}/seans
                    </p>
                  </div>

                  {/* Cancel controls */}
                  <div className="shrink-0">
                    {confirmingId === sub.id ? (
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          onClick={() => handleCancel(sub.id)}
                          disabled={isCancelling === sub.id}
                          className="cursor-pointer text-xs font-semibold text-red-500 disabled:opacity-50"
                        >
                          {isCancelling === sub.id
                            ? "İptal ediliyor..."
                            : "Evet, iptal et"}
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="cursor-pointer text-xs text-gray-400"
                        >
                          Vazgeç
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingId(sub.id)}
                        disabled={isCancelling !== null}
                        className="cursor-pointer text-xs font-semibold text-red-400 disabled:opacity-50"
                      >
                        İptal Et
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
