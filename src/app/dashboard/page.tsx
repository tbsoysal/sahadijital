import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {profile?.first_name || "Guest"} {profile?.last_name || ""}{" "}
          👋
        </h1>
        <p className="mt-2 text-gray-500">You are logged in as {user.email}</p>
      </div>
    </main>
  );
}
