"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { minutesToDbTime } from "@/lib/constants";
import { SubscriptionFormData } from "@/lib/schemas/subscriptionSchema";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { Subscription } from "@/types";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";

export function useSubscriptions() {
  const { selectedField } = useDashboardContext();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedField) return;
    setIsLoading(true);
    subscriptionService
      .fetchSubscriptions(selectedField.id)
      .then(setSubscriptions)
      .catch(() => setError("Abonelikler yüklenemedi."))
      .finally(() => setIsLoading(false));
  }, [selectedField]);

  const createSubscription = async (
    data: SubscriptionFormData,
  ): Promise<boolean> => {
    if (!selectedField) return false;

    setIsLoading(true);
    setError(null);

    try {
      const startTimeStr = minutesToDbTime(data.startTime);
      const endTimeStr = minutesToDbTime(data.endTime);

      const result =
        await subscriptionService.createSubscriptionWithReservations({
          field_id: selectedField.id,
          customer_name: data.customerName,
          customer_phone: data.phone ?? "",
          day_of_week: data.dayOfWeek,
          start_time: startTimeStr,
          end_time: endTimeStr,
          price_per_session: parseFloat(data.price),
          description: data.description,
        });

      if (result.conflicts.length > 0) {
        const dateList = result.conflicts
          .map((d) =>
            format(new Date(d + "T12:00:00"), "d MMMM yyyy", { locale: tr }),
          )
          .join(", ");
        setError(`Çakışan tarihler mevcut: ${dateList}`);
        return false;
      }

      setSubscriptions((prev) => [result.subscription, ...prev]);
      return true;
    } catch {
      setError("Abonelik oluşturulamadı. Tekrar deneyin.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async (id: string, cutoffDate: Date): Promise<void> => {
    setIsCancelling(id);
    try {
      await subscriptionService.cancelSubscription(id, format(cutoffDate, "yyyy-MM-dd"));
      setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("Abonelik iptal edilemedi.");
    } finally {
      setIsCancelling(null);
    }
  };

  return {
    subscriptions,
    isLoading,
    error,
    clearError: () => setError(null),
    createSubscription,
    cancelSubscription,
    isCancelling,
  };
}
