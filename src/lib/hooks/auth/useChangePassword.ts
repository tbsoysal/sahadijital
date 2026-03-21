import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/schemas/changePasswordSchema";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profileService } from "@/lib/services/profileService";

export function useChangePassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isRecoverySession, setIsRecoverySession] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const query = new URLSearchParams(window.location.search);
    const isFromEmail = hash.includes("type=recovery") || query.has("code");

    if (!isFromEmail) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        router.replace(session ? "/dashboard" : "/login");
      });
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecoverySession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

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
