import Navbar from "@/components/ui/Navbar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="pt-4 px-5 bg-linear-to-b from-[#93CFEC] to-[#F6FFE8] tablet:pt-5 tablet:px-12 desktop:pt-6">
      <Navbar />
      <main className="my-10">
        {/* Badge */}
        <div className="max-w-max flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full mx-auto border border-primary-color mb-5">
          <Image
            src="/images/labelstar-icon.svg"
            alt="star icon"
            width={20}
            height={20}
          />
          <span className="font-medium text-base">Modern rezervasyon sistemi</span>
        </div>

        {/* Heading */}
        <h1 className="font-bold text-5xl text-center mb-6">Halı Saha 3 Adımda Rezervasyon</h1>

        {/* Paragraph */}
        <p className="font-medium text-lg text-center mb-5">Online rezervasyonlar alın, takviminizi yönetin ve gelir istatistiklerinizi anında görün. Hepsi tek platformda, modern bir arayüzle.</p>

        <button className="btn-primary btn-border-effect mx-auto px-5 py-3">Hemen Demo Kullan</button>
      </main>

      <div className="relative w-full rounded-2xl h-[400px] overflow-hidden drop-shadow-xl mb-4">
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
