import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/schemas/signup";
import { createClient } from "@/lib/supabase/client";

export const useSignup = () => {
  const supabase = createClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (userdata: SignupFormData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userdata.email,
      password: userdata.password,
      options: {
        data: {
          first_name: userdata.name,
          last_name: userdata.surname,
          phone: userdata.phone,
          field_name: userdata.fieldName,
        },
        emailRedirectTo: "https://sahadijital.com/login",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.user?.identities?.length === 0) {
      setErrorMessage("Bu e-posta adresi zaten kullanımda.");
      return;
    }

    setIsSuccess(true);
  };

  return {
    register,
    errors,
    isSuccess,
    errorMessage,
    setErrorMessage,
    handleSignup: handleSubmit(handleSignup),
  };
};
