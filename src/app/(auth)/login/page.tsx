import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/sections/login/LoginForm";
import Button from "@/components/ui/Button";

export default function Login() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#93CFEC] to-white">
      <div className="px-5 py-12">
        <div className="tablet:max-w-[400px] mx-auto mb-10 box-content max-w-[350px] text-center">
          {/* Logo */}
          <Link
            href="/"
            className="mb-10 flex items-center justify-center gap-2"
          >
            <Image
              src="/images/sahadijital-logo.svg"
              alt="saha dijital logo"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-xl font-bold text-[#039855]">
              Saha Dijital
            </span>
          </Link>

          <h2 className="tablet:text-[40px] tablet:leading-14 desktop:text-5xl desktop:leading-[68px] mb-4 text-[28px] leading-10 font-medium">
            Hemen Giriş Yap
          </h2>
          <p className="text-secondary-color tablet:text-xl tablet:leading-7 desktop:text-2xl desktop:leading-[34px] tablet:mb-12 desktop:mb-16 mb-10 text-base leading-6 font-medium">
            Rezervasyonlarını yönet, bildirimleri takip et ve sahalarını kontrol
            et.
          </p>
          <LoginForm />
          <span className="mx-auto mt-6 block w-full max-w-[350px] border border-dashed border-[#A4A7AE]"></span>
          <Button variant="secondary" className="my-6 w-full max-w-[350px]">
            <Image
              src="/images/google-icon.svg"
              alt="google icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Google ile giriş yap
          </Button>
          <p className="font-medium">
            Hesabın yok mu?{" "}
            <Link href="/signup" className="text-primary">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
