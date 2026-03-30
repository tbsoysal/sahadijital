import { z } from "zod";

export const bookingRequestSchema = z
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

    startTime: z.number().int().min(0).max(23),

    endTime: z.number().int().min(0).max(23),

    description: z.string().max(500, "Açıklama çok uzun").optional(),
  })
  .refine(
    (data) =>
      data.endTime > data.startTime ||
      (data.startTime === 23 && data.endTime === 0),
    {
      message: "Bitiş saati başlangıç saatinden sonra olmalı",
      path: ["endTime"],
    },
  );

export type BookingRequestFormData = z.infer<typeof bookingRequestSchema>;
