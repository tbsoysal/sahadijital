import Image from "next/image";
import { Button } from "../Button";

const NavBar = () => {
  return (
    <div className="max-w-7xl flex justify-between items-center xl:mx-auto mx-5 px-8 py-3 bg-white border-t-[1px] border-l-[1px] border-b-[4px] border-r-[4px] border-[#181D27] rounded-full">
      <a href="#" className="flex items-center gap-1">
        <Image
          src="/images/sahadijital-icon.svg"
          alt="ball icon"
          width={32}
          height={30}
        />
        <span className="text-xl font-medium">SahaDijital</span>
      </a>
      <ul className="hidden lg:flex gap-3 text-[#181D27] font-medium text-xl">
        <li><a className="px-2 py-1" href="#">Özellikler</a></li>
        <li><a className="px-2 py-1" href="#">Faydalar</a></li>
        <li><a className="px-2 py-1" href="#">Nasıl Çalışır?</a></li>
        <li><a className="px-2 py-1" href="#">Fiyatlandırma</a></li>
      </ul>
      <div className="hidden lg:flex gap-3">
        <Button href="#" variant="secondary">Ücretsiz Kayıt Ol</Button>
        <Button href="#" variant="primary">Giriş Yap</Button>
      </div>
      <div className="lg:hidden cursor-pointer">
        <Image
          src="/images/hamburger-icon.svg"
          alt="hamburger-icon"
          width={24}
          height={20}
        />
      </div>
    </div>
  )
}

export default NavBar;
