import { z } from "zod";

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalı")
    .max(50, "İsim çok uzun"),

  last_name: z
    .string()
    .min(2, "Soyisim en az 2 karakter olmalı")
    .max(50, "Soyisim çok uzun"),

  email: z
    .string()
    .trim()
    .min(1, "Email zorunlu")
    .pipe(z.email("Geçerli bir email gir")),

  phone: z
    .string()
    .min(11, "Telefon numarası geçersiz")
    .max(11, "Telefon numarası geçersiz")
    .regex(/^[0-9+]+$/, "Sadece rakam ve + kullanılabilir"),

  business_name: z
    .string()
    .min(2, "İşletme adı en az 2 karakter olmalı")
    .max(100, "İşletme adı çok uzun"),

  password: z
    .string()
    .min(8, "Şifre en az 6 karakter olmalı")
    .regex(/[A-Z]/, "En az 1 büyük harf içermeli")
    .regex(/[a-z]/, "En az 1 küçük harf içermeli")
    .regex(/[0-9]/, "En az 1 rakam içermeli"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
