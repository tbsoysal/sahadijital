import { supabase } from "@/lib/supabase/client";

export const profileService = {
  fetchProfile: async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw authError;

    const { data: profile, error: dbError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (dbError) throw dbError;
    return profile;
  },

  insertProfile: async (
    updateField: "password" | "full_name" | "business_name" | "email",
    newValue: string,
  ) => {
    if (updateField === "full_name" || updateField === "business_name") {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError;

      const column =
        updateField === "full_name" ? "full_name" : "business_name";
      const { error } = await supabase
        .from("profiles")
        .update({ [column]: newValue })
        .eq("id", user.id);
      if (error) throw error;
    } else {
      const payload =
        updateField === "password"
          ? { password: newValue }
          : { email: newValue };
      const { error } = await supabase.auth.updateUser(payload);
      if (error) throw error;
    }
  },
};
