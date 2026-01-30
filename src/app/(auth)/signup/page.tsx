"use client";

import InputBox from "@/components/auth/InputBox";
import { useSignup } from "@/lib/hooks/useSignup";

export default function SignupPage() {
  const {
    form,
    setForm,
    isCheckboxChecked,
    setIsCheckboxChecked,
    handleSignup,
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
        onSubmit={(e) => handleSignup(e)}
      >
        <div className="flex gap-3">
          <InputBox
            type="text"
            label="Ad"
            placeholder="Ad"
            value={form.first_name}
            onChange={(e) =>
              setForm({ ...form, first_name: e.currentTarget.value })
            }
            required
          />
          <InputBox
            type="text"
            label="Soyad"
            placeholder="Soyad"
            value={form.last_name}
            onChange={(e) =>
              setForm({ ...form, last_name: e.currentTarget.value })
            }
            required
          />
        </div>
        <InputBox
          type="mail"
          label="Mail Adresi"
          placeholder="Mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
          required
        />
        <InputBox
          type="text"
          label="İşletme Adı"
          placeholder="Mega Halı Saha"
          value={form.business_name}
          onChange={(e) =>
            setForm({ ...form, business_name: e.currentTarget.value })
          }
          required
        />
        <InputBox
          type="phone"
          label="Telefon"
          placeholder="5*********"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.currentTarget.value })}
          required
        />
        <InputBox
          type="password"
          label="Şifre"
          placeholder="******"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.currentTarget.value })
          }
          required
        />
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

        <InputBox
          type="submit"
          value="Kayıt Ol"
          disabled={!isCheckboxChecked}
          className="cursor-pointer bg-[#12B76A]! text-white hover:border-black! disabled:border-none! disabled:bg-[#A6F4C5]!"
        />
      </form>
    </div>
  );
}
