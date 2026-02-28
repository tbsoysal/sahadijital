import { supabase } from "@/lib/supabase/client"

export const profileService = {
  getUserInfo: async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user)
      throw authError;

    const { data: profile, error: dbError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (dbError)
      throw dbError;
    return profile;
  },

  updateUser: async (updateField: "password" | "full_name" | "business_name" | "email", newValue: string) => {
    let updatePayload = {};
    if (updateField === "full_name") updatePayload = { data: { full_name: newValue } };
    else if (updateField === "password") updatePayload = { password: newValue };
    else if (updateField === "business_name") updatePayload = { data: { business_name: newValue } };
    else if (updateField === "email") updatePayload = { email: newValue };

    const { error } = await supabase.auth.updateUser(updatePayload);

    if (error) throw error;
  },
}
