import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import createServiceClient from "@/lib/supabase/service";

export async function POST(req: NextRequest) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
  const { field_id, customer_name, reservation_date, start_time } =
    await req.json();

  if (!field_id) {
    return NextResponse.json({ error: "field_id required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: field } = await supabase
    .from("fields")
    .select("user_id, name")
    .eq("id", field_id)
    .single();

  if (!field) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth")
    .eq("user_id", field.user_id);

  if (!subscriptions?.length) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  const date = reservation_date
    ? new Date(reservation_date).toLocaleDateString("tr-TR")
    : "";
  const time = start_time ? (start_time as string).slice(0, 5) : "";

  const payload = JSON.stringify({
    title: `Yeni Rezervasyon — ${field.name}`,
    body: `${customer_name} · ${date} ${time}`,
    url: "/dashboard",
  });

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
      ),
    ),
  );

  // Remove expired subscriptions (browser unsubscribed)
  const expired = subscriptions
    .filter((_, i) => {
      const r = results[i];
      return (
        r.status === "rejected" &&
        (r.reason as { statusCode?: number })?.statusCode === 410
      );
    })
    .map((s) => s.endpoint);

  if (expired.length) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .in("endpoint", expired);
  }

  return NextResponse.json({
    ok: true,
    sent: results.filter((r) => r.status === "fulfilled").length,
  });
}
