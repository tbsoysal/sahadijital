import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email boş olamaz").email("Geçerli bir email gir"),

  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .max(64, "Şifre çok uzun"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
