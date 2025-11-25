import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/features/login/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#93CFEC] to-white">
      <div className="px-5 py-12">
        <div className="mx-auto mb-10 box-content max-w-[400px] gap-4 text-center">
          {/* Logo */}
          <Link
            href="/"
            className="z-10 flex items-center justify-center gap-1"
          >
            <Image
              src="/images/sahadijital-icon.svg"
              alt="saha dijital logo"
              width={32}
              height={30}
            />
            <span className="text-xl font-medium">Sahadijital</span>
          </Link>

          <h2 className="text-[32px] font-bold">Hemen Giriş Yap</h2>
          <p className="text-secondary-color text-xl font-medium">
            Rezervasyonlarını yönet, bildirimleri takip et ve sahalarını kontrol
            et.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
