"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/schemas/signup";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const SignupForm = () => {
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (userdata: SignupFormData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userdata.email,
      password: userdata.password,
    });

    if (error) {
      setIsSuccess(false);
      console.log(error);
      return;
    }

    console.log(data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <Modal />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[350px] flex-col gap-3 text-white"
    >
      {/* Name fields */}
      <div className="flex gap-3">
        <Input
          {...register("name")}
          errors={errors.name}
          label="Ad"
          type="text"
          placeholder="Ahmet"
          className="w-1/2"
        />
        <Input
          {...register("surname")}
          errors={errors.surname}
          label="Soyad"
          type="text"
          placeholder="Demir"
          className="w-1/2"
        />
      </div>

      {/* Mail */}
      <Input
        {...register("email")}
        errors={errors.email}
        label="Mail Adresi"
        type="email"
        placeholder="ahmetdemir@gmail.com"
      />

      {/* Saha Adı */}
      <Input
        {...register("fieldName")}
        errors={errors.fieldName}
        label="Saha Adı"
        type="text"
        placeholder="Küçükçekmece saha"
      />

      {/* Telefon */}
      <div>
        <label className="text-secondary-color mb-1.5 block text-base font-medium">
          Telefon Numarası
        </label>
        <div className="flex w-full rounded-lg border border-r-2 border-b-2 border-[#A4A7AE]">
          <span className="text-secondary-color block rounded-l-lg bg-white px-2 py-2 focus:outline-none">
            +90
          </span>
          <input
            {...register("phone")}
            name="phone"
            type="tel"
            placeholder="5*********"
            className="flex-1 rounded-r-lg border-l border-[#A4A7AE] bg-white px-3 py-2 focus:outline-none"
          />
        </div>
        {errors.phone && (
          <span className="tablet:text-sm desktop:text-base mt-1.5 text-[12px] text-red-500">
            {errors.phone.message}
          </span>
        )}
      </div>

      {/* Şifre */}
      <div>
        <label
          htmlFor="password"
          className="text-secondary-color mb-1.5 block text-base font-medium"
        >
          Şifre
        </label>
        <div className="relative w-full rounded-lg border border-r-2 border-b-2 border-[#A4A7AE] bg-white">
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
          <span className="tablet:text-sm desktop:text-base mt-1.5 text-[12px] text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Checkbox */}
      <div className="mb-6 flex items-start space-x-2 text-sm">
        <input
          id="privacy"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-[3px] size-4 accent-emerald-400"
        />
        <label
          htmlFor="privacy"
          className="text-secondary-color text-base leading-6 font-medium"
        >
          Kişisel verilerimin işlenmesine yönelik{" "}
          <a href="#" className="text-emerald-400 underline">
            aydınlatma metnini
          </a>{" "}
          okudum ve kabul ediyorum.
        </label>
      </div>

      {/* Button */}
      <Button type="submit" disabled={!accepted} className="text-xl">
        Kayıt Ol
      </Button>
    </form>
  );
};

export default SignupForm;
