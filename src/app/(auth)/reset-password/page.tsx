"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const onSubmit = async (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    console.log(data);
  };

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
            Şifre Yenileme
          </h2>
          <p className="text-secondary-color tablet:text-xl tablet:leading-7 desktop:text-2xl desktop:leading-[34px] tablet:mb-12 desktop:mb-16 mb-10 text-base leading-6 font-medium">
            Şifre yenileme bağlantısını gönderebilmemiz için e-posta adresinize
            ihtiyacımız var.
          </p>
        </div>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="mx-auto flex max-w-[350px] flex-col gap-3 text-start text-white"
        >
          {/* Mail */}
          <Input
            errors={undefined}
            label="Mail Adresi"
            type="email"
            placeholder="sahadijital@gmail.com"
          />

          <Button>Gönder</Button>
          <Button variant="secondary">
            <ArrowLeft className="mr-1" />
            Geri Dön
          </Button>
        </form>
      </div>
    </div>
  );
}
