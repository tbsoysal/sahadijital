"use client";

import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { useChangePassword } from "@/lib/hooks/useChangePassword";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    resetPassword,
    router,
    serverError,
    setServerError,
  } = useChangePassword();

  return (
    <div>
      <div className="mx-auto mt-10 max-w-[400px] text-center">
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
        <Button disabled={isSubmitSuccessful} className="mt-5 mb-3 w-full">
          {isSubmitSuccessful ? "Başarılı!" : "Kaydet"}
        </Button>
      </form>
      if(!serverError)
      {
        <NotificationModal
          open={isSubmitSuccessful}
          onClose={() => router.push("/login")}
          title="Başarılı!"
          message="Şifreniz başarıyla değiştirildi! Giriş yapabilirsiniz!"
          actionText="Giriş Yap"
          onAction={() => router.push("/login")}
        />
      }
      else
      {
        <NotificationModal
          open={true}
          variant="error"
          onClose={() => router.push("/login")}
          title="Bir sorun oluştu!"
          message={serverError ? serverError : "Bu sayfaya erişiminiz yok!"}
          actionText="Tamam"
          onAction={() => setServerError(null)}
        />
      }
    </div>
  );
}
