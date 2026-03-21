import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/schemas/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profileService } from "@/lib/services/profileService";

export function useChangePassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isRecoverySession, setIsRecoverySession] = useState<boolean | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("Session var: ", data.session);
        setIsRecoverySession(true);
      } else {
        console.log("Session yok: ", data.session);
        setIsRecoverySession(false);
      }
    };

    checkAccess();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const resetPassword: SubmitHandler<ChangePasswordFormData> = async (data) => {
    try {
      await profileService.insertProfile("password", data.password);
      setIsSuccess(true);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu",
      );
    }
  };

  return {
    register,
    handleSubmit,
    resetPassword,
    errors,
    router,
    serverError,
    isSuccess,
    isRecoverySession,
  };
}
