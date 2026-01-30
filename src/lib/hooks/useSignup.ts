import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema, SignupFormData } from "@/lib/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignup() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup: SubmitHandler<SignupFormData> = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          business_name: data.business_name,
        },
      },
    });

    if (!error) {
      router.push("/dashboard");
    } else {
      setServerError(error.message);
    }
  };

  return {
    isCheckboxChecked,
    setIsCheckboxChecked,
    handleSignup,
    register,
    errors,
    handleSubmit,
    isSubmitting,
    serverError,
    setServerError,
    router,
  };
}
