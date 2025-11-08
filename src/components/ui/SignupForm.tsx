"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        fieldName: "",
        phone: "",
        password: "",
    });

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Basit form doğrulama
        const { name, surname, email, fieldName, phone, password } = formData;
        if (!name || !surname || !email || !fieldName || !phone || !password) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        // Telefon doğrulama: 5 ile başlasın, sadece rakam ve 10 hane
        const phoneRegex = /^5\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Telefon numarası 5 ile başlamalı, 10 haneli ve sadece rakamlardan oluşmalıdır.");
            return;
        }

        // Şifre uzunluğu kontrolü
        if (password.length < 7) {
            alert("Şifre en az 7 karakter olmalıdır.");
            return;
        }

        if (!accepted) {
            alert("Lütfen aydınlatma metnini onaylayın.");
            return;
        }

        // ✅ Tüm kontroller geçtiyse yönlendir
        alert("Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz...");
        router.push("/login");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[350px] flex flex-col gap-3 text-white"
        >
            {/* Name fields */}
            <div className="flex gap-3">
                <div className="w-1/2">
                    <label className="block font-medium text-base text-secondary-color mb-1.5">
                        Ad
                    </label>
                    <div className="border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                        <input
                            name="name"
                            type="text"
                            placeholder="Ahmet"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="block font-medium text-base text-secondary-color mb-1.5">
                        Soyad
                    </label>
                    <div className="border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                        <input
                            name="surname"
                            type="text"
                            placeholder="Demir"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                </div>
            </div>

            {/* Mail */}
            <div>
                <label className="block font-medium text-base text-secondary-color mb-1.5">
                    Mail Adresi
                </label>
                <div className="w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <input
                        name="email"
                        type="email"
                        placeholder="ahmetdemir@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>
            </div>

            {/* Saha Adı */}
            <div>
                <label className="block font-medium text-base text-secondary-color mb-1.5">
                    Saha Adı
                </label>
                <div className="w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <input
                        name="fieldName"
                        type="text"
                        placeholder="Küçükçekmece saha"
                        value={formData.fieldName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>
            </div>

            {/* Telefon */}
            <div>
                <label className="block font-medium text-base text-secondary-color mb-1.5">
                    Telefon Numarası
                </label>
                <div className="flex w-full border-effect rounded-lg after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <span className="block py-2 px-2 rounded-l-lg bg-white focus:outline-none text-secondary-color">
                        +90
                    </span>
                    <input
                        name="phone"
                        type="tel"
                        placeholder="5*********"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 rounded-r-lg bg-white border-l focus:outline-none"
                    />
                </div>
            </div>

            {/* Şifre */}
            <div>
                <label
                    htmlFor="password"
                    className="block font-medium text-base text-secondary-color mb-1.5"
                >
                    Şifre
                </label>
                <div className="relative w-full border-effect rounded-lg bg-white after:border-r-2 after:border-b-2 before:rounded-lg after:rounded-lg">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-4 py-2 flex items-center text-gray-400 hover:text-white"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start space-x-2 text-sm mb-3">
                <input
                    id="privacy"
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="size-7 align-self-top accent-emerald-400"
                />
                <label
                    htmlFor="privacy"
                    className="font-medium text-sm text-secondary-color"
                >
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
                className="font-medium text-base btn-primary btn-border-effect disabled:before:hidden disabled:after:hidden transition disabled:opacity-50"
            >
                Kayıt Ol
            </button>
        </form>
    );
};

export default SignupForm;