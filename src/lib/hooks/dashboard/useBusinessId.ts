import { jwtDecode } from "jwt-decode";
import { supabase } from "@/lib/supabase/client";

export async function getBusinessId() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) return null;

  const payload = jwtDecode<{ business_id: string }>(token);
  return payload.business_id;
}
