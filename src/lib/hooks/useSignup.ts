import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "../supabase/client";

export function useSignup() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    business_name: "",
  });

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          business_name: form.business_name,
        },
      },
    });

    if (!error) router.push("/dashboard");
    else window.alert(error);
  };

  return {
    isCheckboxChecked,
    setIsCheckboxChecked,
    handleSignup,
    form,
    setForm,
  };
}
