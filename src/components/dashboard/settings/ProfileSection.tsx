"use client";

import { useState } from "react";
import SettingsCard from "./SettingsCard";
import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { profileService } from "@/lib/services/profileService";
import { useDashboardContext } from "@/context/DashboardContext";

type Props = {
  initialFirstName: string;
  initialLastName: string;
  initialBusinessName: string;
};

export default function ProfileSection({
  initialFirstName,
  initialLastName,
  initialBusinessName,
}: Props) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [modal, setModal] = useState<{
    open: boolean;
    success: boolean;
    message: string;
  }>({
    open: false,
    success: true,
    message: "",
  });

  // save logic
  const { setUserData, userData } = useDashboardContext();
  const isLoadingData = !userData.id;
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const initialFullName = `${initialFirstName} ${initialLastName}`.trim();

      if (fullName !== initialFullName) {
        await profileService.insertProfile("full_name", fullName);
      }
      if (businessName !== initialBusinessName) {
        await profileService.insertProfile("business_name", businessName);
      }

      setUserData((prev) => ({
        ...prev,
        firstName,
        lastName,
        businessName,
      }));
      setModal({ open: true, success: true, message: "Profil bilgileriniz güncellendi." });
    } catch (error) {
      setModal({
        open: true,
        success: false,
        message: error instanceof Error ? error.message : "Bir hata oluştu, lütfen tekrar deneyin.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SettingsCard title="Profil Bilgileri">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <InputBox
              label="Ad"
              value={isLoadingData ? "Yükleniyor..." : firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputBox
              label="Soyad"
              value={isLoadingData ? "Yükleniyor..." : lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <InputBox
            label="İşletme Adı"
            value={isLoadingData ? "Yükleniyor..." : businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <Button
            className="self-end px-8"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </SettingsCard>

      <NotificationModal
        open={modal.open}
        variant={modal.success ? "success" : "error"}
        title={modal.success ? "Kaydedildi" : "Hata"}
        message={modal.message}
        onAction={() => setModal({ ...modal, open: false })}
      />
    </>
  );
}
