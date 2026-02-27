import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginFormData } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authService } from "@/lib/services/authService";

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
    try {
      await authService.signIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setServerError("Login error: " + error);
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
