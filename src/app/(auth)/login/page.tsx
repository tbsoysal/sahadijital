"use client";

import InputBox from "@/components/auth/InputBox";
import { useLogin } from "@/lib/hooks/useLogin";

export default function LoginPage() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

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

      <form onSubmit={(e) => handleLogin(e)} className="mx-auto max-w-sm p-6">
        <div className="flex flex-col gap-5">
          <InputBox
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            label="Kullanıcı Bilgileri"
            required
          />
          <InputBox
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label="Şifre"
            required
          />
          <InputBox
            type="submit"
            value="Giriş Yap"
            className="cursor-pointer bg-[#12B76A]! text-white hover:border-black! disabled:border-none! disabled:bg-[#A6F4C5]!"
          />
        </div>
      </form>
    </div>
  );
}
