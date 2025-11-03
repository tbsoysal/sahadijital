import Image from "next/image"

export default function BenefitBox2() {
  return (
    <div className="benefitContainer border-effect">

      {/* Text Content */}
      <div className="benefitTextContainer p-10! rounded-t-[20px] tablet:rounded-t-none tablet:rounded-l-[20px] bg-[#A6F4C5]">
        <h3 className="font-bold text-3xl leading-[44px] mb-8">Gelirlerinizi takip edin</h3>
        <p className="font-medium text-xl text-secondary-color leading-[28px] mb-2.5">Günlük, haftalık ve aylık kazançlarınızı tek ekranda görüntüleyin.</p>
        <p className="font-medium text-xl text-secondary-color leading-[28px]">Hangi saatlerin daha yoğun olduğunu takip edin.</p>
      </div>

      {/* Image content */}
      <div className="benefitImageContainer">
        <div className="mx-auto">

          {/* Card */}
          <div className="flex justify-between items-start w-[460px] bg-[#D1FADF] p-8 mb-10 border-effect rounded-[16px] before:rounded-[16px] after:rounded-[16px]">
            <div className="flex flex-col">
              <span className="font-medium text-xl mb-5">Bu ay</span>
              <span className="font-bold text-4xl mb-1">84,250₺</span>
              <span className="font-medium text-base text-secondary-color">280 rezervasyon tamamlandı</span>
            </div>
            <span className="flex items-center bg-[#A6F4C5] rounded-full border-1 border-[#32D583] px-5 py-2">
              <Image src="/images/arrow.svg" alt="arrow icon" width={14} height={14} className="mr-2.5" />
              <span className="block font-medium text-xl text-[#039855]">%18</span>
            </span>
          </div>

          {/* Info */}
          <div>
            <span className="block font-bold text-3xl mb-6">En popüler saatler</span>

            <div className="flex items-center mb-5">
              <Image src="/images/clock.svg" alt="clock icon" width={24} height={24} className="mr-2" />
              <span className="font-medium text-xl mr-3">21:00-22:00</span>
              <div className="w-[240px] h-[24px] bg-[#F5F5F5] rounded-full border border-secondary-color mr-3">
                <div className="w-[205px] h-[24px] bg-primary rounded-full border-secondary-color"></div>
              </div>
              <span className="font-medium text-xl">%90</span>
            </div>

            <div className="flex items-center">
              <Image src="/images/clock.svg" alt="clock icon" width={24} height={24} className="mr-2" />
              <span className="font-medium text-xl mr-3">18:00-19:00</span>
              <div className="w-[240px] h-[24px] bg-[#F5F5F5] rounded-full border border-secondary-color mr-3">
                <div className="w-[167px] h-[24px] bg-primary rounded-full border-secondary-color"></div>
              </div>
              <span className="font-medium text-xl">%70</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
