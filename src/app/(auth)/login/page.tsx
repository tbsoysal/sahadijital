"use client";

import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { useLogin } from "@/lib/hooks/useLogin";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    handleLogin,
    errors,
    isSubmitting,
    serverError,
    router,
  } = useLogin();

  return (
    <div>
      <div className="mx-auto mt-10 max-w-[400px] text-center">
        <h2 className="text-primary-color mb-4 text-4xl font-medium">
          Hemen Giriş Yap
        </h2>
        <p className="text-secondary-color text-xl font-medium">
          Rezervasyonlarını yönet, bildirimleri takip et ve sahalarını kontrol
          et.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mx-auto max-w-sm p-6"
      >
        <div className="flex flex-col gap-5">
          <div>
            <InputBox
              {...register("email", { required: "Email zorunlu" })}
              placeholder="Email"
              label="Kullanıcı Bilgileri"
            />
            {errors.email && (
              <span className="text-sm text-red-700">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <InputBox
              {...register("password", { required: "Şifre zorunlu" })}
              type="password"
              placeholder="Password"
              label="Şifre"
            />
            <div className="mt-1.5 flex flex-row-reverse items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-primary block text-end text-sm font-medium"
              >
                Şifremi unuttum?
              </Link>
              {errors.password && (
                <span className="text-sm text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </div>
      </form>

      <p className="text-secondary-color text-center text-base font-medium">
        Hesabın yok mu?{" "}
        <Link href="/signup" className="text-primary">
          Kayıt Ol
        </Link>
      </p>
      {serverError && (
        <NotificationModal
          open={true}
          variant="error"
          title="Bir sorun oluştu!"
          message={serverError ? serverError : "Bir hata oluştu!"}
          actionText="Tamam"
          onAction={() => router.push("/dashboard")}
        />
      )}
    </div>
  );
}
