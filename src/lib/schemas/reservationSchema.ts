import { z } from "zod";

export const reservationSchema = z
  .object({
    customerName: z
      .string()
      .min(2, "Müşteri adı en az 2 karakter olmalı")
      .max(100, "Müşteri adı çok uzun"),

    phone: z
      .string()
      .min(10, "Telefon numarası geçersiz")
      .max(15, "Telefon numarası geçersiz")
      .regex(/^[0-9\s-]+$/, "Geçerli bir telefon numarası girin"),

    startTime: z.number().int().min(0).max(1410).refine((v) => v % 30 === 0),

    endTime: z.number().int().min(0).max(1410).refine((v) => v % 30 === 0),

    description: z.string().max(500, "Açıklama çok uzun").optional(),

    price: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Geçerli bir fiyat girin")
      .refine((val) => parseFloat(val) >= 0, "Fiyat negatif olamaz"),

    isPaid: z.boolean(),
  })
  .refine(
    (data) =>
      data.endTime > data.startTime ||
      (data.startTime >= 1380 && data.endTime === 0),
    {
      message: "Bitiş saati başlangıç saatinden sonra olmalı",
      path: ["endTime"],
    },
  );

export type ReservationFormData = z.infer<typeof reservationSchema>;
