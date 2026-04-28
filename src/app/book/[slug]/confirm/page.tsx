"use client";

import { bookingRequestSchema, BookingRequestFormData } from "@/lib/schemas/bookingRequestSchema";
import { useSubmitRequest } from "@/lib/hooks/booking/useSubmitRequest";
import { NotificationModal } from "@/components/NotificationModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const fieldName = searchParams.get("fieldName") ?? "";
  const hour = Number(searchParams.get("hour"));
  const date = searchParams.get("date") ?? "";
  const price = Number(searchParams.get("price"));
  const fieldId = searchParams.get("fieldId") ?? "";

  const [submitted, setSubmitted] = useState(false);

  const formattedDate = date
    ? format(new Date(date), "d MMM", { locale: tr })
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingRequestFormData>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      startTime: hour,
      endTime: (hour + 1) % 24,
    },
  });

  const { submitRequest, isLoading, error } = useSubmitRequest(() => {
    setSubmitted(true);
  });

  const onSubmit = (data: BookingRequestFormData) => {
    submitRequest({
      field_id: fieldId,
      customer_name: data.customerName,
      customer_phone: data.phone,
      reservation_date: date,
      start_time: `${String(hour).padStart(2, "0")}:00:00`,
      end_time: `${String((hour + 1) % 24).padStart(2, "0")}:00:00`,
      description: data.description,
      price,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 md:flex md:items-start md:justify-center md:py-10">
      <div className="w-full md:max-w-lg md:overflow-hidden md:rounded-2xl md:bg-white md:shadow-lg">
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Rezervasyonu Tamamla
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {fieldName} · {formattedDate}
          </p>
        </div>

        {/* Summary Card */}
        <div className="flex flex-col gap-3 rounded-2xl border border-[#12B76A] bg-[#f0fdf4] p-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Saha</span>
            <span className="font-bold text-gray-900">{fieldName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tarih</span>
            <span className="font-bold text-gray-900">{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Saat</span>
            <span className="font-bold text-gray-900">
              {String(hour).padStart(2, "0")}:00 (1 saat)
            </span>
          </div>
          <div className="flex justify-between border-t border-green-200 pt-3">
            <span className="font-bold text-gray-900">Toplam</span>
            <span className="text-xl font-bold text-[#12B76A]">₺{price}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Ad Soyad */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Ad Soyad
            </label>
            <input
              {...register("customerName")}
              type="text"
              placeholder="Ahmet Yılmaz"
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-[#12B76A]"
            />
            {errors.customerName && (
              <p className="text-xs text-red-500">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Telefon */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Telefon</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="0532 000 00 00"
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-[#12B76A]"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
            <span className="text-lg">💡</span>
            <p className="text-sm text-yellow-800">
              Ödeme sahada nakit olarak yapılacaktır. Rezervasyonunuz
              onaylandıktan sonra SMS ile bildirim alacaksınız.
            </p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#12B76A] py-4 text-base font-bold text-white transition-colors active:bg-[#0e9d5a] disabled:opacity-60"
          >
            {isLoading ? "Gönderiliyor..." : "Rezervasyonu Onayla ✓"}
          </button>
        </form>
      </div>
      <NotificationModal
        open={submitted}
        variant="success"
        title="Rezervasyonunuz Oluşturuldu!"
        message="Rezervasyon iptal ve değiştirme işlemleriniz için telefon üzerinden iletişime geçiniz!"
        actionText="Tamam"
        onAction={() => router.push(`/book/${slug}`)}
      />
      </div>
    </div>
  );
}
