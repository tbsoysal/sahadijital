"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="secondary"
      className="px-3! py-2! text-base!"
    >
      Logout
    </Button>
  );
}
