"use client";

import { useStats } from "@/lib/hooks/dashboard/useStats";
import { useDashboardContext } from "@/context/DashboardContext";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function StaticsPage() {
  const { selectedField } = useDashboardContext();
  const { total, paid, unpaid, revenue, isLoading, error } = useStats();

  const monthLabel = format(new Date(), "MMMM yyyy", { locale: tr });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center gap-3 pt-32 text-center">
        <p className="text-sm text-gray-400">Hesaplanıyor...</p>
      </div>
    );
  }

  if (!selectedField) {
    return (
      <div className="flex min-h-screen flex-col items-center gap-3 pt-32 text-center">
        <p className="text-sm text-gray-400">Lütfen bir saha seçiniz</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-5 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-gray-800 md:text-2xl">İstatistikler</h1>
          <span className="text-lg font-bold text-gray-400 md:text-2xl">·</span>
          <span className="text-lg font-bold text-gray-400 md:text-2xl">
            {selectedField.name}
          </span>
        </div>
        <p className="text-sm text-gray-400 capitalize">{monthLabel}</p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Toplam Rezervasyon"
          value={total}
          isLoading={isLoading}
        />
        <StatCard
          label="Ödendi"
          value={paid}
          isLoading={isLoading}
          color="text-green-500"
        />
        <StatCard
          label="Ödenmedi"
          value={unpaid}
          isLoading={isLoading}
          color="text-amber-500"
        />
        <StatCard
          label="Aylık Gelir"
          value={`₺${revenue}`}
          isLoading={isLoading}
          color="text-green-600"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  isLoading,
  color = "text-gray-800",
}: {
  label: string;
  value: number | string;
  isLoading: boolean;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white p-5 shadow-sm md:p-6">
      <span className="text-xs font-medium text-gray-400 md:text-sm">{label}</span>
      {isLoading ? (
        <div className="h-8 w-16 animate-pulse rounded-md bg-gray-100" />
      ) : (
        <span className={`text-2xl font-bold md:text-3xl ${color}`}>{value}</span>
      )}
    </div>
  );
}
