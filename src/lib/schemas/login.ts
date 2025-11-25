import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Geçerli bir e-posta girin!"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı!"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
