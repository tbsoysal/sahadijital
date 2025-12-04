import Navbar from "@/components/features/landing/Navbar";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <header className="tablet:pt-5 tablet:px-12 desktop:pt-6 h-screen overflow-hidden bg-linear-to-b from-[#93CFEC] to-[#F6FFE8] px-5 pt-4">
      <Navbar />
      <HeroContent />
      <HeroImage />
    </header>
  );
}

function HeroContent() {
  return (
    <main className="desktop:max-w-[1264px] tablet:my-12 mx-auto my-10 max-w-[928px] text-center">
      <Badge />

      <h1 className="tablet:text-[56px] desktop:text-6xl mb-4 text-center text-5xl leading-16 font-bold">
        Halı Saha 3 Adımda Rezervasyon
      </h1>

      <p className="tablet:mb-6 desktop:mb-8 mb-5 text-center text-lg font-medium">
        Online rezervasyonlar alın, takviminizi yönetin ve gelir
        istatistiklerinizi anında görün. Hepsi tek platformda, modern bir
        arayüzle.
      </p>

      {/* CTA Button */}
      <Button>Hemen Demo Kullan</Button>
    </main>
  );
}

function HeroImage() {
  return (
    <div className="tablet:mb-0 tablet:rounded-b-none tablet:drop-shadow-none tablet:max-w-[928px] desktop:max-w-[1048px] tablet:h-full relative mx-auto h-[400px] w-full overflow-hidden rounded-2xl pb-4 drop-shadow-xl">
      <Image
        src="/images/heroimage.png"
        alt="reservation calendar screen"
        fill
        className="tablet:block absolute bottom-0 hidden object-contain object-top"
      />
      <Image
        src="/images/mobileHero.png"
        alt="reservation calendar screen"
        fill
        className="tablet:hidden absolute block object-cover object-top-left"
      />
    </div>
  );
}
