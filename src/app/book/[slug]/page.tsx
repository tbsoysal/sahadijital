import createServiceClient from "@/lib/supabase/service";
import { notFound } from "next/navigation";
import BookingView from "@/components/book/BookingView";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createServiceClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, business_name")
    .eq("slug", slug)
    .single();

  if (!profile) notFound();

  const { data: fields } = await supabase
    .from("fields")
    .select("id, name, default_price, start_hour, end_hour")
    .eq("user_id", profile.id);

  if (!fields || fields.length === 0) notFound();

  return (
    <BookingView businessName={profile.business_name ?? ""} fields={fields} />
  );
}
