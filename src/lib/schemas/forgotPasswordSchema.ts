import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email zorunlu")
    .pipe(z.email("Geçerli bir email gir")),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
