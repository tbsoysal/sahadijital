import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/schemas/changePasswordSchema";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "@/lib/services/authService";

export function useChangePassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setServerError("Bu sayfaya erişemezsiniz");
        setIsSuccess(false);
      }
    };

    checkAccess();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const resetPassword: SubmitHandler<ChangePasswordFormData> = async (data) => {
    try {
      await authService.updateUser("password", data.password)
      setIsSuccess(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu");
    }
  };

  return {
    register,
    handleSubmit,
    resetPassword,
    errors,
    isSubmitSuccessful,
    router,
    serverError,
    isSuccess,
  };
}
