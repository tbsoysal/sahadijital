import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/schemas/forgotPasswordSchema";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    setServerError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setServerError(error.message);
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
