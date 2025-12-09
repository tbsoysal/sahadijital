import Image from "next/image";

export default function BenefitBox2() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      {/* Text Content */}
      <div className="benefitTextContainer tablet:rounded-t-none tablet:rounded-l-[20px] rounded-t-[20px] bg-[#A6F4C5] p-10!">
        <h3 className="tablet:text-[34px] desktop:text-[40px] mb-8 text-2xl leading-8 font-bold">
          Gelirlerinizi takip edin
        </h3>
        <p className="text-secondary-color tablet:text-xl desktop:text-2xl mb-2.5 text-base leading-8 font-medium">
          Günlük, haftalık ve aylık kazançlarınızı tek ekranda görüntüleyin.
        </p>
        <p className="text-secondary-color tablet:text-xl desktop:text-2xl text-base leading-8 font-medium">
          Hangi saatlerin daha yoğun olduğunu takip edin.
        </p>
      </div>

      {/* Image content */}
      <div className="benefitImageContainer">
        <div className="mx-auto">
          {/* Card */}
          <div className="border-primary-color mb-10 flex w-full items-start justify-between rounded-2xl border border-r-4 border-b-4 bg-[#D1FADF] px-5 py-8">
            <div className="flex flex-col">
              <span className="tablet:text-xl desktop:2xl mb-5 text-base font-medium">
                Bu ay
              </span>
              <span className="tablet:text-[32px] desktop:text-[40px] mb-1 text-xl font-bold">
                84,250₺
              </span>
              <span className="text-secondary-color tablet:text-lg desktop:text-xl text-sm font-medium">
                280 rezervasyon tamamlandı
              </span>
            </div>
            <span className="flex items-center rounded-full border border-[#32D583] bg-[#A6F4C5] px-3 py-1">
              <Image
                src="/images/arrow.svg"
                alt="arrow icon"
                width={14}
                height={14}
                className="mr-2.5"
              />
              <span className="tablet:text-lg desktop:text-2xl block text-[12px] font-medium text-[#039855]">
                %18
              </span>
            </span>
          </div>

          {/* Info */}
          <div>
            <span className="tablet:text-[28px] desktop:text-[32px] mb-6 block text-xl font-bold">
              En popüler saatler
            </span>

            <div className="mb-5 flex items-center">
              <Image
                src="/images/clock.svg"
                alt="clock icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="tablet:text-xl desktop:text-2xl mr-3 text-sm font-medium">
                21:00-22:00
              </span>
              <div className="border-secondary-color tablet:w-[200px] mr-3 h-5 w-[120px] rounded-full border bg-[#F5F5F5]">
                <div className="bg-primary border-secondary-color tablet:w-40 h-5 w-[105px] rounded-full"></div>
              </div>
              <span className="tablet:text-xl desktop:text-2xl text-sm font-medium">
                %90
              </span>
            </div>

            <div className="flex items-center">
              <Image
                src="/images/clock.svg"
                alt="clock icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="tablet:text-xl desktop:text-2xl mr-3 text-sm font-medium">
                18:00-19:00
              </span>
              <div className="border-secondary-color tablet:w-[200px] mr-3 h-5 w-[120px] rounded-full border bg-[#F5F5F5]">
                <div className="bg-primary border-secondary-color tablet:w-30 h-5 w-20 rounded-full"></div>
              </div>
              <span className="tablet:text-xl desktop:text-2xl text-sm font-medium">
                %70
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
