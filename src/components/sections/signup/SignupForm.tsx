"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { useSignup } from "@/hooks/useSignup";
import { PasswordField } from "@/components/ui/PasswordField";
import PrivacyModal from "@/components/ui/PrivacyModal";
import PhoneField from "@/components/ui/PhoneField";

const SignupForm = () => {
  const [accepted, setAccepted] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const {
    register,
    handleSignup,
    isSuccess,
    errorMessage,
    setErrorMessage,
    errors,
  } = useSignup();

  if (isSuccess) return <Modal />;
  if (errorMessage)
    return (
      <ErrorPopup
        message={errorMessage}
        onClose={() => setErrorMessage("")}
        redirectPath="/login"
      />
    );

  return (
    <form
      onSubmit={handleSignup}
      className="mx-auto flex max-w-[350px] flex-col gap-3 text-white"
    >
      <div className="flex gap-3">
        <Input
          type="text"
          {...register("name")}
          errors={errors.name}
          label="Ad"
          placeholder="Ad"
          className="w-1/2"
        />
        <Input
          type="text"
          {...register("surname")}
          errors={errors.surname}
          label="Soyad"
          placeholder="Soyad"
          className="w-1/2"
        />
      </div>

      <PhoneField error={errors} register={register} />

      <Input
        {...register("email")}
        errors={errors.email}
        label="Mail Adresi"
        type="email"
        placeholder="Mail"
      />
      <Input
        {...register("fieldName")}
        errors={errors.fieldName}
        label="Saha Adı"
        type="text"
        placeholder="Saha adı"
      />

      <PasswordField register={register("password")} error={errors.password} />

      <div className="mb-6 flex cursor-pointer items-start space-x-2 text-sm">
        <label className="text-secondary-color cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="relative top-0.5 mr-1"
          />
          Kişisel verilerimin işlenmesine yönelik{" "}
          <span
            onClick={() => setIsPrivacyOpen(true)}
            className="cursor-pointer text-emerald-400 underline"
          >
            aydınlatma metnini
          </span>{" "}
          okudum ve kabul ediyorum.
        </label>
      </div>

      <Button type="submit" disabled={!accepted} className="text-xl">
        Kayıt Ol
      </Button>

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </form>
  );
};

export default SignupForm;
