import Navbar from "@/components/ui/Navbar";
import Badge from "../ui/Badge";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="pt-4 px-5 bg-linear-to-b from-[#93CFEC] to-[#F6FFE8] tablet:pt-5 tablet:px-12 desktop:pt-6">

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section Main Content */}
      <main className="max-w-[832px] mx-auto my-10 tablet:my-12">
        {/* Badge */}
        <Badge />

        {/* Heading */}
        <h1 className="font-bold text-5xl text-center mb-6">Halı Saha 3 Adımda Rezervasyon</h1>

        {/* Paragraph */}
        <p className="font-medium text-lg text-center mb-5">Online rezervasyonlar alın, takviminizi yönetin ve gelir istatistiklerinizi anında görün. Hepsi tek platformda, modern bir arayüzle.</p>

        {/* CTA Button */}
        <button className="btn-primary btn-border-effect mx-auto px-5 py-3">Hemen Demo Kullan</button>
      </main>

      {/* Hero Image */}
      <div className="relative w-full rounded-2xl h-[400px] overflow-hidden drop-shadow-xl pb-4 mx-auto tablet:mb-0 tablet:rounded-b-none tablet:drop-shadow-none tablet:max-w-[928px] desktop:max-w-[1048px]">
        <Image
          src="/images/heroimage.png"
          alt="reservation calendar screen"
          fill
          className="absolute object-cover object-top-left"
        />
      </div>

    </header>
  )
}
