import Image from "next/image";

export default function BenefitBox1() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      {/* Text Content */}
      <div className="benefitTextContainer">
        <h3 className="mb-8 text-3xl leading-11 font-bold">
          Online rezervasyon takibi
        </h3>
        <p className="text-secondary-color mb-2.5 text-xl leading-7 font-medium">
          Oyuncular istediği saatte rezervasyon yapabilsin, siz sadece
          onaylayın.
        </p>
        <p className="text-secondary-color text-xl leading-7 font-medium">
          7/24 açık sanal saha defteriniz olsun.
        </p>
      </div>
      {/* Image content */}
      <div className="benefitImageContainer bg-[#B2DDFF]">
        <div className="mx-auto">
          <p className="mb-8 text-start text-2xl font-medium">
            Bekleyen Rezervasyonlar
          </p>
          {/* Reservation Card */}
          <div className="grid gap-5 overflow-hidden">
            {["14:00 - 15:00", "20:00 - 21:00", "22:00 - 23:00"].map(
              (time, index) => {
                return (
                  <div
                    key={index}
                    className="tablet:gap-[108px] desktop:gap-[83px] border-effect flex items-center gap-[19px] rounded-2xl bg-white px-6 py-4 before:rounded-2xl after:rounded-2xl"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/clock.svg"
                          alt="clock icon"
                          width={20}
                          height={20}
                        />
                        <span className="min-w-max text-base font-bold">
                          {time}
                        </span>
                      </div>
                      <span className="block text-base font-medium text-[#717680]">
                        Bugün
                      </span>
                    </div>
                    <span className="block rounded-full bg-[#FEEE95] px-4 py-1 text-base font-medium text-[#85490E]">
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
