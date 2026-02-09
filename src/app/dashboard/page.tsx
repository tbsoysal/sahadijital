import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { WeeklyCalendar } from "@/components/dashboard/calendar/WeeklyCalendar";

export default async function Dashboard() {
  const supabase = await createClient();

  // 1. Verify the user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.log(authError, user);
    redirect("/login");
  }

  // 2. Fetch first_name and last_name from the 'profiles' table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id) // The 'id' in profiles should match the 'id' from auth.users
    .single();

  if (profileError) {
    // Handle cases where the profile might not exist yet
    console.error("Error loading profile:", profileError.message);
  }

  return <WeeklyCalendar />;
}
