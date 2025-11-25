"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas/login";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Link from "next/link";

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
      className="mx-auto flex max-w-[350px] flex-col gap-3 text-white"
    >
      {/* Mail */}
      <Input
        {...register("email")}
        errors={errors.email}
        label="Kullanıcı Bilgileri"
        type="email"
        placeholder="E-mail"
      />

      {/* Şifre */}
      <div>
        <label
          htmlFor="password"
          className="text-secondary-color mb-1.5 block text-base font-medium"
        >
          Şifre
        </label>
        <div className="border-effect relative w-full rounded-lg bg-white before:rounded-lg after:rounded-lg after:border-r-2 after:border-b-2">
          <input
            {...register("password")}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="w-full rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-4 py-2 text-gray-400 hover:text-white"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {errors.password && (
          <span className="mt-1.5 text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        <Link
          href="/reset-password"
          className="mt-1.5 block text-end text-base text-[#05603A]"
        >
          Şifremi unuttum?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="btn-primary btn-border-effect text-base font-medium transition disabled:opacity-50 disabled:before:hidden disabled:after:hidden"
      >
        Giriş Yap
      </button>
    </form>
  );
}
