import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginFormData } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function useLogin() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    setServerError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!error) {
      console.log("Signing in...");
      router.push("/dashboard");
    } else {
      console.log(error);
      setServerError(error.message);
    }
  };

  return {
    register,
    handleSubmit,
    handleLogin,
    errors,
    isSubmitting,
    serverError,
    setServerError,
    router,
  };
}
