"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/schemas/changePasswordSchema";
import { useState } from "react";
import SettingsCard from "./SettingsCard";
import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { profileService } from "@/lib/services/profileService";

type Props = {
  currentEmail: string;
};

export default function SecuritySection({ currentEmail }: Props) {
  const [modal, setModal] = useState<{
    open: boolean;
    success: boolean;
    message: string;
  }>({
    open: false,
    success: true,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handlePasswordSave = async (data: ChangePasswordFormData) => {
    try {
      await profileService.insertProfile("password", data.password);
      setModal({
        open: true,
        success: true,
        message: "Şifreniz başarıyla güncellendi.",
      });
      reset();
    } catch (error) {
      setModal({
        open: true,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Bir hata oluştu, lütfen tekrar deneyin.",
      });
    }
  };

  return (
    <>
      <SettingsCard title="Güvenlik">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            Email Adresiniz
          </h3>
          <p className="text-lg text-gray-400">{currentEmail}</p>

          <hr className="border-gray-100" />

          <form
            onSubmit={handleSubmit(handlePasswordSave)}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Şifre Değiştir
            </h3>
            <div className="flex flex-col gap-1.5">
              <InputBox
                label="Yeni Şifre"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <InputBox
                label="Şifre Tekrar"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="self-end px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </form>
        </div>
      </SettingsCard>

      <NotificationModal
        open={modal.open}
        variant={modal.success ? "success" : "error"}
        title={modal.success ? "Şifre Güncellendi" : "Hata"}
        message={modal.message}
        onAction={() => setModal({ ...modal, open: false })}
      />
    </>
  );
}
