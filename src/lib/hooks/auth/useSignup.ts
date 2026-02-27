import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema, SignupFormData } from "@/lib/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/lib/services/authService";

export function useSignup() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup: SubmitHandler<SignupFormData> = async (data) => {
    const fullName = data.first_name + data.last_name;
    try {
      await authService.signUp(data.email, data.password, fullName, data.phone, data.business_name);
      router.push("/login");
    } catch (error) {
      setServerError("Sign up error: " + error);
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
    router,
  };
}
