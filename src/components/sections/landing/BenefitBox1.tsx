import Image from "next/image";

export default function BenefitBox1() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      {/* Text Content */}
      <div className="benefitTextContainer">
        <h3 className="tablet:text-[32px] tablet:leading-12 desktop:text-[40px] mb-8 text-2xl leading-8 font-bold">
          Online rezervasyon takibi
        </h3>
        <p className="text-secondary-color tablet:text-xl mb-2.5 text-base leading-6 font-medium">
          Oyuncular istediği saatte rezervasyon yapabilsin, siz sadece
          onaylayın.
        </p>
        <p className="text-secondary-color tablet:text-xl text-base leading-6 font-medium">
          7/24 açık sanal saha defteriniz olsun.
        </p>
      </div>
      {/* Image content */}
      <div className="benefitImageContainer bg-[#B2DDFF]">
        <div className="mx-auto">
          <p className="tablet:text-2xl desktop:text-3xl mb-8 text-start text-lg font-medium">
            Bekleyen Rezervasyonlar
          </p>
          {/* Reservation Card */}
          <div className="grid gap-5 overflow-hidden">
            {["14:00 - 15:00", "20:00 - 21:00", "22:00 - 23:00"].map(
              (time, index) => {
                return (
                  <div
                    key={index}
                    className="tablet:gap-[108px] desktop:gap-[83px] border-primary-color flex items-center gap-[19px] rounded-2xl border border-r-4 border-b-4 bg-white px-6 py-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/clock.svg"
                          alt="clock icon"
                          width={20}
                          height={20}
                        />
                        <span className="tablet:text-[28px] desktop:text-[32px] min-w-max text-base font-bold">
                          {time}
                        </span>
                      </div>
                      <span className="tablet:text-xl desktop:text-2xl block text-base font-medium text-[#717680]">
                        Bugün
                      </span>
                    </div>
                    <span className="tablet:text-xl desktop:text-[24px] block rounded-full bg-[#FEEE95] px-4 py-1 text-base font-medium text-[#85490E]">
                      Bekliyor
                    </span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
