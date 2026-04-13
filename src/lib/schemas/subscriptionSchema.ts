import { z } from "zod";

export const subscriptionSchema = z
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

    dayOfWeek: z.number().int().min(0).max(6),

    startTime: z.number().int().min(0).max(23),

    endTime: z.number().int().min(0).max(23),

    price: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Geçerli bir fiyat girin")
      .refine((val) => parseFloat(val) >= 0, "Fiyat negatif olamaz"),

    description: z.string().max(500, "Açıklama çok uzun").optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "Bitiş saati başlangıç saatinden sonra olmalı",
    path: ["endTime"],
  });

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
