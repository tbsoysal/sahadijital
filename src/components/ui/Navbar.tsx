import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-effect w-full bg-white rounded-full px-5 py-3 max-w-[1264px] mx-auto tablet:px-6 tablet:py-4">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-1 z-10">
        <Image
          src="/images/sahadijital-icon.svg"
          alt="saha dijital logo"
          width={32}
          height={30}
        />
        <span className="font-medium text-xl">Sahadijital</span>
      </Link>

      {/* Mobile Hamburger Icon */}
      <button className="block px-[3px] py-1.5 z-10 desktop:hidden">
        <Image
          src="/images/hamburger-icon.svg"
          alt="Nav menu button"
          width={18}
          height={12}
          className="w-auto h-auto"
        />
      </button>

      {/* Desktop Navigation Menu */}
      <ul className="hidden desktop:flex z-10">
        <li><a href="#" className="nav-link">Özellikler</a></li>
        <li><a href="#" className="nav-link">Faydalar</a></li>
        <li><a href="#" className="nav-link">Nasıl Çalışır?</a></li>
        <li><a href="#" className="nav-link">Fiyatlandırma</a></li>
      </ul>

      {/* Desktop CTA Buttons */}
      <div className="hidden gap-2 z-10 desktop:flex">
        <Link href="/signup"><button className="btn-secondary btn-border-effect">Ücretsiz Kayıt Ol</button></Link>
        <Link href="/signin"><button className="btn-primary btn-border-effect">Giriş Yap</button></Link>
      </div>

    </div>
  )
}
