import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/lib/services/authService";

export function useForgotPassword() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const sendPasswordLink: SubmitHandler<ForgotPasswordFormData> = async (
    data,
  ) => {
    try {
      await authService.sendPasswordReset(data.email);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Beklenmedik bir hata oluştu")
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    sendPasswordLink,
    isSubmitSuccessful,
    serverError,
    router,
  };
}
