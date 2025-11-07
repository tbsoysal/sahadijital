"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.alert("Form submitted");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-3 text-white"
        >
            {/* Name fields */}
            <div className="flex gap-3">
                <div className="w-1/2">
                    <label className="block font-medium text-base text-secondary-color mb-1.5">Ad</label>
                    <div className="border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                        <input
                            name="name"
                            type="text"
                            placeholder="Ad"
                            className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="block font-medium text-base text-secondary-color mb-1.5">Soyad</label>
                    <div className="border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                        <input
                            name="surname"
                            type="text"
                            placeholder="Soyad"
                            className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                </div>
            </div>

            {/* Mail */}
            <div>
                <label className="block font-medium text-base text-secondary-color mb-1.5">Mail Adresi</label>
                <div className="w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <input
                        type="email"
                        placeholder="sahadijital.com"
                        className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>
            </div>

            {/* Saha Adı */}
            <div>
                <label className="block font-medium text-base text-secondary-color mb-1.5">Saha Adı</label>
                <div className="w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <input
                        type="text"
                        placeholder="Küçükçekmece saha"
                        className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>
            </div>

            {/* Telefon */}
            <div>
                <label className="block font-medium text-base text-secondary-color mb-1.5">Telefon Numarası</label>
                <div className="flex w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <select className="px-2 rounded-l-lg bg-white focus:outline-none">
                        <option value="+90">+90</option>
                    </select>
                    <input
                        type="tel"
                        placeholder="5*********"
                        className="flex-1 px-3 py-2 rounded-r-lg bg-white border-l focus:outline-none"
                    />
                </div>
            </div>

            {/* Şifre */}
            <div>
                <label htmlFor="password" className="block font-medium text-base text-secondary-color mb-1.5">Şifre</label>
                <div className="relative w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start space-x-2 text-sm">
                <input
                    id="privacy"
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="size-7 align-self-top accent-emerald-400"
                />
                <label htmlFor="privacy" className="font-medium text-sm text-secondary-color">
                    Kişisel verilerimin işlenmesine yönelik{" "}
                    <a href="#" className="text-emerald-400 underline">
                        aydınlatma metnini
                    </a>{" "}
                    okudum ve kabul ediyorum.
                </label>
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={!accepted}
                className="w-full py-2 rounded-md bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition disabled:opacity-50"
            >
                Kayıt Ol
            </button>
        </form>
    );
};

export default SignupForm;