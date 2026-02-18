import { z } from "zod";

export const reservationSchema = z.object({
  customerName: z
    .string()
    .min(2, "Müşteri adı en az 2 karakter olmalı")
    .max(100, "Müşteri adı çok uzun"),

  customerPhone: z
    .string()
    .min(10, "Telefon numarası geçersiz")
    .max(15, "Telefon numarası geçersiz")
    .regex(/^[0-9+\s-]+$/, "Geçerli bir telefon numarası girin"),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Geçerli bir tarih formatı girin"),

  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Geçerli bir saat formatı girin"),

  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Geçerli bir saat formatı girin"),

  fieldId: z.string().min(1, "Saha seçimi gereklidir"),

  fieldName: z.string().optional(),

  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Geçerli bir fiyat girin")
    .refine((val) => parseFloat(val) >= 0, "Fiyat negatif olamaz"),

  isPaid: z.boolean(),

  note: z.string().max(500, "Not çok uzun").optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
