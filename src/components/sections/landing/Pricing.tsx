import Badge from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

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
          <h2 className="tablet:text-[56px] tablet:leading-14 desktop:text-5xl desktop:leading-[68px] mb-6 text-[28px] leading-10 font-medium">
            Fiyatlandırma
          </h2>
          <p className="text-secondary-color tablet:text-2xl desktop:text-[28px] tablet:leading-[34px] desktop:leading-10 text-lg leading-[26px] font-medium">
            Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing
            mi massa nibh sit. Diam praesent elit a lorem.
          </p>
        </div>

        {/* Card */}
        <div className="border-primary-color tablet:flex-row tablet:gap-16 tablet:justify-evenly mx-auto flex max-w-[1264px] flex-col justify-between rounded-[20px] border border-r-4 border-b-4 bg-[#CEEAB0] p-8">
          <div className="desktop:max-w-[560px] max-w-[392px]">
            <h3 className="tablet:text-[32px] tablet:leading-[46px] desktop:text-[40px] desktop:leading-14 mb-6 text-2xl leading-[34px] font-bold">
              Online rezervasyon takibi
            </h3>
            <p className="text-secondary-color tablet:text-xl desktop:text-2xl tablet:leading-7 desktop:leading-[34px] mb-10 text-base leading-6 font-medium">
              Rezervasyon yönetiminden gelir takibine kadar tüm özellikleri tek
              pakette kullanın.
            </p>
            <div className="flex items-center gap-3">
              <span className="tablet:text-[32px] desktop:text-[40px] text-2xl font-medium line-through">
                ₺5000
              </span>
              <h4 className="text-4xl font-bold">
                ₺2000<span className="text-xl font-medium">/Aylık</span>
              </h4>
            </div>
            <span className="text-secondary-color mb-6 block text-base font-medium">
              12 ay boyunca sabit fiyat
            </span>
            <Link href="/signup">
              <Button className="tablet:w-auto mb-10 w-[284px] py-3">
                14 Gün Ücretsiz Deneyin
                <Image
                  src="/images/linkarrow.svg"
                  alt="link icon"
                  width={15}
                  height={15}
                  className="ml-2"
                />
              </Button>
            </Link>
          </div>
          <div>
            <h3 className="tablet:text-[28px] desktop:text-[34px] mb-4 text-xl font-bold">
              Özellikler
            </h3>
            <div className="flex flex-col gap-3">
              <p className="tablet:text-xl desktop:text-2xl flex gap-3 text-base font-medium">
                <Image
                  src="/images/thickIcon.svg"
                  alt="thick"
                  width={20}
                  height={20}
                />
                Sınırsız online rezervasyon
              </p>
              <p className="tablet:text-xl desktop:text-2xl flex gap-3 text-base font-medium">
                <Image
                  src="/images/thickIcon.svg"
                  alt="thick"
                  width={20}
                  height={20}
                />
                Kolay saha takvimi yönetimi
              </p>
              <p className="tablet:text-xl desktop:text-2xl flex gap-3 text-base font-medium">
                <Image
                  src="/images/thickIcon.svg"
                  alt="thick"
                  width={20}
                  height={20}
                />
                Otomatik SMS ve e-posta bildirimleri
              </p>
              <p className="tablet:text-xl desktop:text-2xl flex gap-3 text-base font-medium">
                <Image
                  src="/images/thickIcon.svg"
                  alt="thick"
                  width={20}
                  height={20}
                />
                Gelir ve doluluk analizi
              </p>
              <p className="tablet:text-xl desktop:text-2xl flex gap-3 text-base font-medium">
                <Image
                  src="/images/thickIcon.svg"
                  alt="thick"
                  width={20}
                  height={20}
                />
                Tüm cihazlarda yönetim paneli
              </p>
              <p className="tablet:text-xl desktop:text-2xl flex gap-3 text-base font-medium">
                <Image
                  src="/images/thickIcon.svg"
                  alt="thick"
                  width={20}
                  height={20}
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
