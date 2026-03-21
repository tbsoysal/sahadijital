import { supabase } from "@/lib/supabase/client";

export const authService = {
  signUp: async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    businessName: string,
  ) => {
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
      password,
    });

    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },

  sendPasswordReset: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://sahadijital.com/reset-password",
    });

    if (error) throw error;
  },
};
