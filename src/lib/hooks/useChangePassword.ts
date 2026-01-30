import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/schemas/changePasswordSchema";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useChangePassword() {
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const resetPassword: SubmitHandler<ChangePasswordFormData> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) setServerError(error?.message);
    console.log(error?.message);
  };

  return {
    register,
    handleSubmit,
    resetPassword,
    errors,
    isSubmitSuccessful,
    router,
    serverError,
    setServerError,
  };
}
