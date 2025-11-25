import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-effect tablet:px-6 tablet:py-4 mx-auto flex w-full max-w-[1264px] items-center justify-between rounded-full bg-white px-5 py-3">
      {/* Logo */}
      <Link href="/" className="z-10 flex items-center gap-1">
        <Image
          src="/images/sahadijital-icon.svg"
          alt="saha dijital logo"
          width={32}
          height={30}
        />
        <span className="text-xl font-medium">Sahadijital</span>
      </Link>

      {/* Mobile Hamburger Icon */}
      <button className="desktop:hidden z-10 block px-[3px] py-1.5">
        <Image
          src="/images/hamburger-icon.svg"
          alt="Nav menu button"
          width={18}
          height={12}
          className="h-auto w-auto"
        />
      </button>

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

      {/* Desktop CTA Buttons */}
      <div className="desktop:flex z-10 hidden gap-2">
        <Link href="/signup">
          <button className="btn-secondary btn-border-effect">
            Ücretsiz Kayıt Ol
          </button>
        </Link>
        <Link href="/login">
          <button className="btn-primary btn-border-effect">Giriş Yap</button>
        </Link>
      </div>
    </div>
  );
}
