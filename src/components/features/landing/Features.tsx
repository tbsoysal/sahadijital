import Badge from "@/components/ui/Badge";
import FeatureCard from "@/components/features/landing/FeatureCard";

const features = [
  {
    image: "/images/featuresimage-1.png",
    heading: "Akıllı Rezarvasyon Takvimi",
    paragraph:
      "Akıllı rezervasyon takibi ile dilediğiniz her an boş ya da dolu saatlerin takibini yapabilirsiniz.",
    color: "bg-[#B2DDFF]",
  },
  {
    image: "/images/featuresimage-1.png",
    heading: "Mobil ve web uyumlu panel",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.",
    color: "bg-[#CEEAB0]",
  },
  {
    image: "/images/featuresimage-3.png",
    heading: "Hızlı Rezervasyon",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.",
    color: "bg-[#F5F5F5]",
  },
  {
    image: "/images/featuresimage-4.png",
    heading: "Paylaşılabilir Link",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.",
    color: "bg-[#12B76A]",
  },
  {
    image: "/images/featuresimage-5.png",
    heading: "Gelir İstatistikleri",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.",
    color: "bg-[#F5F5F5]",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-linear-to-b from-[#F6FFE8] to-white">
      <div className="tablet:px-12 tablet:py-16 desktop:px-0 mx-auto max-w-[1264px] px-5 py-12">
        {/* Badge */}
        <Badge className="tablet:mb-6 desktop:mb-8 mx-0 mb-5" />
        {/* Text Content */}
        <div className="mb-10 max-w-[616px]">
          <h2 className="mb-6 text-5xl leading-16 font-medium">
            Öne Çıkan Özellikler
          </h2>
          <p className="text-secondary-color text-2xl leading-8 font-medium">
            Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing
            mi massa nibh sit. Diam praesent elit a lorem.
          </p>
        </div>
        {/* Grid Cards */}
        <div className="tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-6 desktop:gap-y-16 grid grid-cols-1 gap-10">
          {features.map((feature, index) => {
            let customStyle = "desktop:col-span-2";
            if (index === 0 || index === 1) customStyle = "desktop:col-span-3";

            return (
              <FeatureCard
                key={index}
                image={feature.image}
                color={feature.color}
                heading={feature.heading}
                paragraph={feature.paragraph}
                className={customStyle}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
