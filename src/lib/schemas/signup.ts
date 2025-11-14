import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Ad en az 3 karakter olmalı!"),
  surname: z.string().min(2, "Soyad en az 3 karakter olmalı!"),
  email: z.email("Geçerli bir e-posta girin!"),
  phone: z
    .string()
    .regex(/^5\d{9}$/, "Telefon 5 ile başlamalı ve 10 haneli olmalı!"),
  fieldName: z.string().min(2, "Saha adı en az 2 karakter olmalı!"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı!"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
