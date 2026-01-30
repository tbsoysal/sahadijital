import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "../supabase/client";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) router.push("/dashboard");
    else window.alert(error);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
