"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import ProfileSection from "@/components/dashboard/settings/ProfileSection";
import SecuritySection from "@/components/dashboard/settings/SecuritySection";
import FieldsSection from "@/components/dashboard/settings/FieldsSection";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import ReservationSection from "@/components/dashboard/settings/ReservationSection";
import ClosedHoursSection from "@/components/dashboard/settings/ClosedHoursSection";
import OperatingHoursSection from "@/components/dashboard/settings/OperatingHoursSection";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const { userData } = useDashboardContext();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, []);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <h1 className="text-2xl font-bold text-[#181D27]">Ayarlar</h1>
      <ReservationSection slug={userData.slug} />
      <OperatingHoursSection />
      <ClosedHoursSection />
      <FieldsSection />
      <ProfileSection
        key={userData.id}
        initialFirstName={userData.firstName}
        initialLastName={userData.lastName}
        initialBusinessName={userData.businessName}
      />
      <SecuritySection currentEmail={email} />
    </div>
  );
}
