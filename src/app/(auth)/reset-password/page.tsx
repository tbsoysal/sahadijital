"use client";

import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { useChangePassword } from "@/lib/hooks/auth/useChangePassword";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    errors,
    resetPassword,
    router,
    serverError,
    isSuccess,
    isRecoverySession,
  } = useChangePassword();

  return (
    <div>
      {isRecoverySession && (
        <>
          <div className="mx-auto mt-10 max-w-100 text-center">
            <h2 className="text-primary-color mb-4 text-4xl font-medium">
              Yeni Şifre
            </h2>
            <p className="text-secondary-color text-xl font-medium">
              Şifrenizi bu sayfadan değiştirebilirsiniz!
            </p>
          </div>
          <form
            className="mx-auto max-w-sm p-6"
            onSubmit={handleSubmit(resetPassword)}
          >
            <InputBox
              {...register("password")}
              type="password"
              placeholder="Yeni Şifre"
            />
            {errors.password && (
              <span className="block text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
            <InputBox
              {...register("confirmPassword")}
              type="password"
              placeholder="Yeni Şifre Tekrar"
            />
            {errors.confirmPassword && (
              <span className="block text-sm text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
            <Button disabled={isSuccess} className="mt-5 mb-3 w-full">
              {isSuccess ? "Başarılı!" : "Kaydet"}
            </Button>
          </form>
        </>
      )}
      {serverError && (
        <NotificationModal
          open={true}
          variant="error"
          title="Bir sorun oluştu!"
          message={serverError ? serverError : "Bir hata oluştu."}
          actionText="Tamam"
          onAction={() => router.push("/login")}
        />
      )}
      {isSuccess && (
        <NotificationModal
          open={true}
          title="Başarılı!"
          message="Şifreniz başarıyla değiştirildi! Giriş yapabilirsiniz!"
          actionText="Giriş Yap"
          onAction={() => router.push("/login")}
        />
      )}
    </div>
  );
}
