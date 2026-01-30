"use client";

import InputBox from "@/components/auth/InputBox";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { useSignup } from "@/lib/hooks/useSignup";

export default function SignupPage() {
  const {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    isCheckboxChecked,
    setIsCheckboxChecked,
    handleSignup,
    serverError,
    setServerError,
    router,
  } = useSignup();

  return (
    <div>
      <div className="mx-auto mt-10 max-w-[400px] text-center">
        <h2 className="text-primary-color mb-4 text-4xl font-medium">
          Hemen Üye Ol
        </h2>
        <p className="text-secondary-color text-xl font-medium">
          Rezervasyonlarını yönet, bildirimleri takip et ve sahalarını kontrol
          et.
        </p>
      </div>

      <form
        className="mx-auto mt-10 flex max-w-[350px] flex-col gap-3"
        onSubmit={handleSubmit(handleSignup)}
      >
        <div className="flex gap-3">
          <div>
            <InputBox
              type="text"
              label="Ad"
              placeholder="Ad"
              {...register("first_name", { required: "Ad boş olamaz" })}
            />
            {errors.first_name && (
              <span className="text-sm text-red-600">
                {errors.first_name.message}
              </span>
            )}
          </div>
          <div>
            <InputBox
              type="text"
              label="Soyad"
              placeholder="Soyad"
              {...register("last_name", { required: "Soyad boş olamaz" })}
            />
            {errors.last_name && (
              <span className="text-sm text-red-600">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <InputBox
            type="mail"
            label="Mail Adresi"
            placeholder="Mail"
            {...register("email", { required: "Email boş olamaz" })}
          />
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div>
          <InputBox
            type="text"
            label="İşletme Adı"
            placeholder="Mega Halı Saha"
            {...register("business_name", { required: "Saha adı boş olamaz" })}
          />
          {errors.business_name && (
            <span className="text-sm text-red-600">
              {errors.business_name.message}
            </span>
          )}
        </div>
        <div>
          <InputBox
            type="phone"
            label="Telefon"
            placeholder="05*********"
            {...register("phone", { required: "Telefon boş olamaz" })}
          />
          {errors.phone && (
            <span className="text-sm text-red-600">{errors.phone.message}</span>
          )}
        </div>
        <div>
          <InputBox
            type="password"
            label="Şifre"
            placeholder="******"
            {...register("password", { required: "Şifre belirleyiniz" })}
          />
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        {/* Checkbox */}
        <label
          htmlFor="checkbox"
          className="flex cursor-pointer items-start gap-1.5"
          onClick={() => setIsCheckboxChecked((prev) => !prev)}
        >
          <input type="checkbox" id="checkbox" className="relative top-1" />
          <p
            className="text-secondary-color text-sm font-medium"
            onClick={() => setIsCheckboxChecked((prev) => !prev)}
          >
            Kişisel verilerimin işlenmesine yönelik{" "}
            <span className="text-[#039855]">aydınlatma metnini</span> okudum ve
            kabul ediyorum.
          </p>
        </label>

        <Button disabled={!isCheckboxChecked}>
          {isSubmitting ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
        </Button>
      </form>
      {serverError && (
        <NotificationModal
          open={true}
          variant="error"
          onClose={() => router.push("/login")}
          title="Bir sorun oluştu!"
          message={serverError ? serverError : "Bir hata oluştu!"}
          actionText="Tamam"
          onAction={() => setServerError(null)}
        />
      )}
    </div>
  );
}
