import { supabase } from "@/lib/supabase/client";

export const authService = {
  signUp: async (email: string, password: string, fullName: string, phone: string, businessName: string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_name: businessName,
          phone: phone,
        },
      },
    });

    if (authError) throw authError;
    return authData;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },

  sendPasswordReset: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: "sahadijital.com/resetpassword" });

    if (error) throw error;
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
