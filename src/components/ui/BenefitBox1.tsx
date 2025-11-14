import Image from "next/image";

export default function BenefitBox1() {
  return (
    <div className="benefitContainer border-effect">
      {/* Text Content */}
      <div className="benefitTextContainer">
        <h3 className="font-bold text-3xl leading-[44px] mb-8">
          Online rezervasyon takibi
        </h3>
        <p className="font-medium text-xl text-secondary-color leading-[28px] mb-2.5">
          Oyuncular istediği saatte rezervasyon yapabilsin, siz sadece
          onaylayın.
        </p>
        <p className="font-medium text-xl text-secondary-color leading-[28px]">
          7/24 açık sanal saha defteriniz olsun.
        </p>
      </div>
      {/* Image content */}
      <div className="benefitImageContainer bg-[#B2DDFF]">
        <div className="mx-auto">
          <p className="font-medium text-2xl text-start mb-8 ">
            Bekleyen Rezervasyonlar
          </p>
          {/* Reservation Card */}
          <div className="grid gap-5  overflow-hidden">
            {["14:00 - 15:00", "20:00 - 21:00", "22:00 - 23:00"].map(
              (time, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-[19px] tablet:gap-[108px] desktop:gap-[83px] bg-white border-effect rounded-[16px] after:rounded-[16px] before:rounded-[16px] px-6 py-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-3 items-center">
                        <Image
                          src="/images/clock.svg"
                          alt="clock icon"
                          width={20}
                          height={20}
                        />
                        <span className="font-bold text-base min-w-max">
                          {time}
                        </span>
                      </div>
                      <span className="block font-medium text-base text-[#717680]">
                        Bugün
                      </span>
                    </div>
                    <span className="block bg-[#FEEE95] text-[#85490E] text-base font-medium rounded-full px-4 py-1">
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
