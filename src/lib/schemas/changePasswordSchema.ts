import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı")
      .regex(/[A-Z]/, "En az 1 büyük harf içermeli")
      .regex(/[a-z]/, "En az 1 küçük harf içermeli")
      .regex(/[0-9]/, "En az 1 rakam içermeli"),

    confirmPassword: z.string().min(1, "Şifre tekrar zorunlu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Şifreler eşleşmiyor",
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
