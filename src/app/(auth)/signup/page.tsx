"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    business_name: "",
  });

  const handleSignup = async () => {
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
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={form[key as keyof typeof form]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
}
