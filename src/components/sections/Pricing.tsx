import Badge from "@/components/ui/Badge"
import Image from "next/image"
import Link from "next/link"

export default function Pricing() {
  return (
    <section id="pricing" className="bg-linear-to-b from-[#D9FFDD] to-[#FFFFFF]">
      <div className="max-w-[1264px] mx-auto px-5 py-12 tablet:px-12 tablet:py-16 desktop:px-0">
        <Badge className="mx-0 mb-5 tablet:mb-6 desktop:mb-8" />
        {/* Text Content */}
        <div className="max-w-[616px] mb-10">
          <h2 className="font-medium text-5xl leading-16 mb-6">Fiyatlandırma</h2>
          <p className="font-medium text-2xl text-secondary-color leading-8">Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.</p>
        </div>

        {/* Card */}
        <div className="flex flex-col gap-16 max-w-[1264px] mx-auto border-effect rounded-[20px] before:rounded-[20px] after:rounded-[20px] p-10 bg-[#CEEAB0] tablet:flex-row tablet:gap-16">
          <div className="max-w-[392px] desktop:max-w-[560px]">
            <h3 className="font-bold text-4xl mb-10 leading-[50px]">Online rezervasyon takibi</h3>
            <p className="font-medium text-xl text-secondary-color leading-[28px] mb-10">Rezervasyon yönetiminden gelir takibine kadar tüm özellikleri tek pakette kullanın.</p>
            <div className="flex items-center gap-3">
              <span className="line-through font-medium text-xl">₺5000</span>
              <h4 className="font-bold text-4xl">₺2000<span className="font-medium text-xl">/Aylık</span></h4>
            </div>
            <span className="block font-medium text-base text-secondary-color mb-6">12 ay boyunca sabit fiyat</span>
            <Link href="/signup" className="btn-primary border-effect font-medium text-base rounded-[8px] before:rounded-[8px] after:rounded-[8px] max-w-max flex gap-2.5 px-4.5 py-3">
              <Image src="/images/linkarrow.svg" alt="link icon" width={15} height={15} />
              14 Gün Ücretsiz Deneyin
            </Link>
          </div>
          <div>
            <h3 className="font-medium text-2xl mb-10">Online rezervasyon takibi</h3>
            <div className="flex flex-col gap-4">
              <p className="flex gap-3 font-medium text-xl">
                <Image src="/images/ballIcon.svg" alt="football icon" width={24} height={24} />
                Sınırsız online rezervasyon
              </p>
              <p className="flex gap-3 font-medium text-xl">
                <Image src="/images/ballIcon.svg" alt="football icon" width={24} height={24} />
                Kolay saha takvimi yönetimi
              </p>
              <p className="flex gap-3 font-medium text-xl">
                <Image src="/images/ballIcon.svg" alt="football icon" width={24} height={24} />
                Otomatik SMS ve e-posta bildirimleri
              </p>
              <p className="flex gap-3 font-medium text-xl">
                <Image src="/images/ballIcon.svg" alt="football icon" width={24} height={24} />
                Gelir ve doluluk analizi
              </p>
              <p className="flex gap-3 font-medium text-xl">
                <Image src="/images/ballIcon.svg" alt="football icon" width={24} height={24} />
                Tüm cihazlarda yönetim paneli
              </p>
              <p className="flex gap-3 font-medium text-xl">
                <Image src="/images/ballIcon.svg" alt="football icon" width={24} height={24} />
                Bulut tabanlı güvenli sistem
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
