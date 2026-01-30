import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginFormData } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!error) {
      router.push("/dashboard");
    } else {
      alert(error.message);
    }
  };

  return {
    register,
    handleSubmit,
    handleLogin,
    errors,
    isSubmitting,
  };
}
