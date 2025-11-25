import Badge from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-linear-to-b from-[#D9FFDD] to-[#FFFFFF]"
    >
      <div className="tablet:px-12 tablet:py-16 desktop:px-0 mx-auto max-w-[1264px] px-5 py-12">
        <Badge className="tablet:mb-6 desktop:mb-8 mx-0 mb-5" />
        {/* Text Content */}
        <div className="mb-10 max-w-[616px]">
          <h2 className="mb-6 text-5xl leading-16 font-medium">
            Fiyatlandırma
          </h2>
          <p className="text-secondary-color text-2xl leading-8 font-medium">
            Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing
            mi massa nibh sit. Diam praesent elit a lorem.
          </p>
        </div>

        {/* Card */}
        <div className="border-effect tablet:flex-row tablet:gap-16 mx-auto flex max-w-[1264px] flex-col gap-16 rounded-[20px] bg-[#CEEAB0] p-10 before:rounded-[20px] after:rounded-[20px]">
          <div className="desktop:max-w-[560px] max-w-[392px]">
            <h3 className="mb-10 text-4xl leading-[50px] font-bold">
              Online rezervasyon takibi
            </h3>
            <p className="text-secondary-color mb-10 text-xl leading-[28px] font-medium">
              Rezervasyon yönetiminden gelir takibine kadar tüm özellikleri tek
              pakette kullanın.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium line-through">₺5000</span>
              <h4 className="text-4xl font-bold">
                ₺2000<span className="text-xl font-medium">/Aylık</span>
              </h4>
            </div>
            <span className="text-secondary-color mb-6 block text-base font-medium">
              12 ay boyunca sabit fiyat
            </span>
            <Link
              href="/login"
              className="btn-primary border-effect flex max-w-max gap-2.5 rounded-[8px] px-4.5 py-3 text-base font-medium before:rounded-[8px] after:rounded-[8px]"
            >
              <Image
                src="/images/linkarrow.svg"
                alt="link icon"
                width={15}
                height={15}
              />
              14 Gün Ücretsiz Deneyin
            </Link>
          </div>
          <div>
            <h3 className="mb-10 text-2xl font-medium">
              Online rezervasyon takibi
            </h3>
            <div className="flex flex-col gap-4">
              <p className="flex gap-3 text-xl font-medium">
                <Image
                  src="/images/ballIcon.svg"
                  alt="football icon"
                  width={24}
                  height={24}
                />
                Sınırsız online rezervasyon
              </p>
              <p className="flex gap-3 text-xl font-medium">
                <Image
                  src="/images/ballIcon.svg"
                  alt="football icon"
                  width={24}
                  height={24}
                />
                Kolay saha takvimi yönetimi
              </p>
              <p className="flex gap-3 text-xl font-medium">
                <Image
                  src="/images/ballIcon.svg"
                  alt="football icon"
                  width={24}
                  height={24}
                />
                Otomatik SMS ve e-posta bildirimleri
              </p>
              <p className="flex gap-3 text-xl font-medium">
                <Image
                  src="/images/ballIcon.svg"
                  alt="football icon"
                  width={24}
                  height={24}
                />
                Gelir ve doluluk analizi
              </p>
              <p className="flex gap-3 text-xl font-medium">
                <Image
                  src="/images/ballIcon.svg"
                  alt="football icon"
                  width={24}
                  height={24}
                />
                Tüm cihazlarda yönetim paneli
              </p>
              <p className="flex gap-3 text-xl font-medium">
                <Image
                  src="/images/ballIcon.svg"
                  alt="football icon"
                  width={24}
                  height={24}
                />
                Bulut tabanlı güvenli sistem
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
