"use client";

import InputBox from "@/components/auth/InputBox";
import { useLogin } from "@/lib/hooks/useLogin";

export default function LoginPage() {
  const { register, handleSubmit, handleLogin, errors, isSubmitting } =
    useLogin();

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
            {errors.password && (
              <span className="text-sm text-red-700">
                {errors.password.message}
              </span>
            )}
          </div>
          <InputBox
            type="submit"
            value={isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
            disabled={isSubmitting}
            className="cursor-pointer bg-[#12B76A]! text-white hover:border-black! disabled:border-none! disabled:bg-[#A6F4C5]!"
          />
        </div>
      </form>
    </div>
  );
}
