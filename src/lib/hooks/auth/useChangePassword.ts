import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/schemas/changePasswordSchema";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useChangePassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
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
    setServerError(null);

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setServerError(error.message);
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
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
