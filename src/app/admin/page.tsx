import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { adminService } from "@/lib/services/adminService";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const userEmail = data?.claims?.email;

  if (!userEmail || userEmail !== process.env.ADMIN_EMAIL) {
    redirect("/login");
  }

  const users = await adminService.listUsers();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Beta Kullanıcılar</h1>
        <p className="mt-1 text-sm text-gray-500">{users.length} kullanıcı</p>
      </div>
      <UsersTable initialUsers={users} />
    </div>
  );
}
