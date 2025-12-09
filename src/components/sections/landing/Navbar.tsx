"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="tablet:px-8 tablet:py-4 mx-auto flex w-full max-w-[1264px] items-center justify-between rounded-full border-t border-r-4 border-b-4 bg-white px-8 py-2">
      {/* Logo */}
      <Link href="/" className="z-10 flex items-center gap-2">
        <Image
          src="/images/sahadijital-logo.svg"
          alt="saha dijital logo"
          width={36}
          height={36}
          className="h-9 w-9"
        />
        <span className="font-arial text-xl font-bold text-[#039855]">
          Saha Dijital
        </span>
      </Link>

      {/* Desktop Navigation Menu */}
      <ul className="desktop:flex z-10 hidden">
        <li>
          <a href="#features" className="nav-link">
            Özellikler
          </a>
        </li>
        <li>
          <a href="#benefits" className="nav-link">
            Faydalar
          </a>
        </li>
        <li>
          <a href="#howitworks" className="nav-link">
            Nasıl Çalışır?
          </a>
        </li>
        <li>
          <a href="#pricing" className="nav-link">
            Fiyatlandırma
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        {/* Desktop CTA Buttons */}
        <div className="tablet:flex z-10 hidden gap-3">
          <Link href="/signup">
            <Button variant="secondary">Ücretsiz Kayıt Ol</Button>
          </Link>
          <Link href="/login">
            <Button>Giriş Yap</Button>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="desktop:hidden z-10 block cursor-pointer p-3"
        >
          <Image
            src="/images/hamburger-icon.svg"
            alt="Nav menu button"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 z-50 h-screen w-full bg-white px-5 py-4">
          <div className="mb-6 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="z-10 flex items-center gap-2">
              <Image
                src="/images/sahadijital-logo.svg"
                alt="saha dijital logo"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-arial text-xl font-bold text-[#039855]">
                Saha Dijital
              </span>
            </Link>

            {/* Menu Close Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="z-10 block cursor-pointer p-2"
            >
              <Image
                src="/images/closemenuicon.svg"
                alt="close menu button"
                width={10}
                height={10}
                className="h-2.5 w-2.5"
              />
            </button>
          </div>

          <ul
            onClick={() => setIsMobileMenuOpen(false)}
            className="mb-6 flex flex-col gap-2 p-0"
          >
            <li>
              <a
                href="#features"
                className="text-primary-color hover:text-secondary-color block w-full px-2 py-1 text-base font-medium"
              >
                Özellikler
              </a>
            </li>
            <li>
              <a
                href="#benefits"
                className="text-primary-color hover:text-secondary-color block w-full px-2 py-1 text-base font-medium"
              >
                Faydalar
              </a>
            </li>
            <li>
              <a
                href="#howitworks"
                className="text-primary-color hover:text-secondary-color block w-full px-2 py-1 text-base font-medium"
              >
                Nasıl Çalışır?
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-primary-color hover:text-secondary-color block w-full px-2 py-1 text-base font-medium"
              >
                Fiyatlandırma
              </a>
            </li>
          </ul>

          <Link href="/signup" className="w-full">
            <Button className="mb-3 w-full" variant="secondary">
              Ücretsiz Kayıt Ol
            </Button>
          </Link>
          <Link href="/login" className="w-full">
            <Button className="w-full">Giriş Yap</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
