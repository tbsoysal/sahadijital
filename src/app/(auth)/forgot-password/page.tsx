"use client";

import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { useForgotPassword } from "@/lib/hooks/auth/useForgotPassword";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    sendPasswordLink,
    serverError,
    router,
  } = useForgotPassword();

  return (
    <div>
      <div className="mx-auto mt-10 max-w-[400px] text-center">
        <h2 className="text-primary-color mb-4 text-4xl font-medium">
          Şifre Yenileme
        </h2>
        <p className="text-secondary-color text-xl font-medium">
          Şifre yenileme bağlantısını gönderebilmemiz için e-posta adresinize
          ihtiyacımız var.
        </p>
      </div>

      <form
        className="mx-auto max-w-sm p-6"
        onSubmit={handleSubmit(sendPasswordLink)}
      >
        <InputBox
          {...register("email")}
          type="email"
          placeholder="sahadijital@gmail.com"
        />
        {errors.email && (
          <span className="block text-sm text-red-600">
            {errors.email.message}
          </span>
        )}
        <Button disabled={isSubmitSuccessful} className="mt-5 mb-3 w-full">
          {isSubmitSuccessful ? "Gönderildi" : "Gönder"}
        </Button>
        <Link href="/login">
          <Button variant="secondary" className="w-full gap-2">
            <ArrowLeft size={20} className="text-black" />
            Geri Dön
          </Button>
        </Link>
      </form>

      {serverError ? (
        <NotificationModal
          open={isSubmitSuccessful}
          variant="error"
          title="Hata!"
          message={serverError}
          actionText="Tamam"
          onAction={() => router.push("/login")}
        />
      ) : (
        <NotificationModal
          open={isSubmitSuccessful}
          title="Başarılı!"
          message="Şifre sıfırlama bağlantısı mail adresinize gönderildi."
          actionText="Giriş Yap"
          onAction={() => router.push("/login")}
        />
      )}
    </div>
  );
}
