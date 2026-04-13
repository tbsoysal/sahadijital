import createServiceClient from "@/lib/supabase/service";

export type AdminUser = {
  id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  is_blocked: boolean;
  days_remaining: number;
};

export const adminService = {
  listUsers: async (): Promise<AdminUser[]> => {
    const supabase = createServiceClient();

    const { data: authData, error: authError } =
      await supabase.auth.admin.listUsers({ perPage: 1000 });
    if (authError) throw authError;

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, business_name, is_blocked");
    if (profilesError) throw profilesError;

    const profileMap = new Map(profiles.map((p) => [p.id, p]));

    return authData.users.map((authUser) => {
      const profile = profileMap.get(authUser.id);
      const createdAt = new Date(authUser.created_at);
      const now = new Date();
      const daysSinceCreation = Math.floor(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
      );
      const daysRemaining = Math.max(0, 30 - daysSinceCreation);

      return {
        id: authUser.id,
        email: authUser.email ?? "",
        full_name: profile?.full_name ?? null,
        business_name: profile?.business_name ?? null,
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at ?? null,
        is_blocked: profile?.is_blocked ?? false,
        days_remaining: daysRemaining,
      };
    });
  },

  setUserBlocked: async (userId: string, blocked: boolean): Promise<void> => {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("profiles")
      .update({ is_blocked: blocked })
      .eq("id", userId);
    if (error) throw error;
  },
};
