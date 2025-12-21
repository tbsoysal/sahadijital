import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/sections/signup/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#93CFEC] to-white">
      <div className="px-5 py-12">
        <div className="mx-auto mb-10 box-content max-w-[400px] gap-4 text-center">
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
            Hemen Üye Ol
          </h2>
          <p className="text-secondary-color tablet:text-xl tablet:leading-7 desktop:text-2xl desktop:leading-[34px] tablet:mb-12 desktop:mb-16 mb-10 text-base leading-6 font-medium">
            Rezervasyonlarını yönet, bildirimleri takip et ve sahalarını kontrol
            et.
          </p>
        </div>

        {/* Form */}
        <SignupForm />
      </div>
    </div>
  );
}
