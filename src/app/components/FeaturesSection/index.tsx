import Label from "../Label";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#F6FFE8] to-[#ffffff]">
      <div className="lg:max-w-7xl px-5 md:px-[48px] mx-auto">
        <div className="pt-[88px] mb-[40px] lg:mb-[64px]">
          <Label className="mb-8">Modern rezervasyon sistemi</Label>
          <h2 className="text-4xl lg:text-5xl font-medium mb-6">Öne Çıkan Özellikler</h2>
          <p className="text-xl lg:text-2xl font-medium text-[#414651]">Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.</p>
        </div>

        <section className="grid grid-cols-1 gap-y-[40px] sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-x-8 lg:gap-y-[64px] pb-[48px]">

          <div className="sm:col-span-1 lg:col-span-3">
            <FeatureCard
              className="bg-[#B2DDFF]"
              heading="Akıllı Rezarvasyon Takvimi"
              paragraph="Akıllı rezervasyon takibi ile dilediğiniz her an boş ya da dolu saatlerin takibini yapabilirsiniz."
              imagePath="/images/featuresimage-1.png"
              imageWidth={536}
              imageHeight={264}
            />
          </div>

          <div className="sm:col-span-1 lg:col-span-3 lg:col-start-4">
            <FeatureCard
              className="bg-[#CEEAB0]"
              heading="Mobil ve web uyumlu panel"
              paragraph="Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem."
              imagePath="/images/featuresimage-1.png"
              imageWidth={536}
              imageHeight={264}
            />
          </div>

          <div className="sm:col-span-1 lg:col-span-2">
            <FeatureCard
              className="bg-[#F5F5F5]"
              heading="Hızlı Rezervasyon"
              paragraph="Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem."
              imagePath="/images/featuresimage-3.png"
              imageWidth={313}
              imageHeight={286}
            />
          </div>

          <div className="sm:col-span-1 lg:col-span-2 lg:col-start-3">
            <FeatureCard
              className="bg-[#12B76A]"
              heading="Paylaşılabilir Link"
              paragraph="Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem."
              imagePath="/images/featuresimage-4.png"
              imageWidth={277}
              imageHeight={248}
            />
          </div>

          <div className="sm:col-span-1 lg:col-span-2 lg:col-start-5">
            <FeatureCard
              className="bg-[#F5F5F5]"
              heading="Gelir İstatistikleri"
              paragraph="Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem."
              imagePath="/images/featuresimage-5.png"
              imageWidth={400}
              imageHeight={243}
            />
          </div>
        </section>

      </div>
    </div>
  )
}

export default FeaturesSection;
