"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas/login";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[350px] flex-col gap-3 text-start text-white"
    >
      {/* Mail */}
      <Input
        {...register("email")}
        errors={errors.email}
        label="Kullanıcı Bilgileri"
        type="email"
        placeholder="Mail & Telefon"
      />

      {/* Şifre */}
      <div>
        <label
          htmlFor="password"
          className="text-secondary-color tablet:text-base tablet:leading-6 desktop:text-lg desktop:leading-[26px] mb-1.5 block text-[12px] leading-[18px] font-medium"
        >
          Şifre
        </label>
        <div
          className={`relative w-full rounded-lg border border-r-2 border-b-2 border-[#A4A7AE] ${errors.password ? "border-[#F97066]" : ""}`}
        >
          <input
            {...register("password")}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="tablet:text-lg tablet:leading-[26px] desktop:text-xl desktop:leading-7 w-full rounded-lg bg-white px-3 py-2.5 text-sm leading-5 font-medium focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-4 py-2"
          >
            {showPassword ? (
              <Eye size={18} color="#717680" />
            ) : (
              <EyeOff size={18} color="#717680" />
            )}
          </button>
        </div>
        <div className="mb-5 flex items-center justify-between">
          {errors.password && (
            <span className="tablet:text-sm desktop:text-base text-[12px] font-medium text-[#D92D20]">
              {errors.password.message}
            </span>
          )}
          <Link
            href="/reset-password"
            className="tablet:text-sm desktop:text-base ml-auto block p-1.5 text-end text-[12px] leading-3.5 text-[#05603A]"
          >
            Şifremi unuttum?
          </Link>
        </div>
      </div>

      {/* Button */}
      <Button type="submit" variant="primary" className="mb-3">
        Giriş Yap
      </Button>

      <label className="flex cursor-pointer gap-1.5">
        <input type="checkbox" />
        <p className="tablet:text-lg desktop:text-base text-sm font-medium">
          Giriş bilgilerimi hatırla
        </p>
      </label>
    </form>
  );
}
