import Image from "next/image";

export default function BenefitBox2() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      {/* Text Content */}
      <div className="benefitTextContainer tablet:rounded-t-none tablet:rounded-l-[20px] rounded-t-[20px] bg-[#A6F4C5] p-10!">
        <h3 className="mb-8 text-3xl leading-11 font-bold">
          Gelirlerinizi takip edin
        </h3>
        <p className="text-secondary-color mb-2.5 text-xl leading-7 font-medium">
          Günlük, haftalık ve aylık kazançlarınızı tek ekranda görüntüleyin.
        </p>
        <p className="text-secondary-color text-xl leading-7 font-medium">
          Hangi saatlerin daha yoğun olduğunu takip edin.
        </p>
      </div>

      {/* Image content */}
      <div className="benefitImageContainer">
        <div className="mx-auto">
          {/* Card */}
          <div className="border-effect mb-10 flex w-[460px] items-start justify-between rounded-2xl bg-[#D1FADF] p-8 before:rounded-2xl after:rounded-2xl">
            <div className="flex flex-col">
              <span className="mb-5 text-xl font-medium">Bu ay</span>
              <span className="mb-1 text-4xl font-bold">84,250₺</span>
              <span className="text-secondary-color text-base font-medium">
                280 rezervasyon tamamlandı
              </span>
            </div>
            <span className="flex items-center rounded-full border border-[#32D583] bg-[#A6F4C5] px-5 py-2">
              <Image
                src="/images/arrow.svg"
                alt="arrow icon"
                width={14}
                height={14}
                className="mr-2.5"
              />
              <span className="block text-xl font-medium text-[#039855]">
                %18
              </span>
            </span>
          </div>

          {/* Info */}
          <div>
            <span className="mb-6 block text-3xl font-bold">
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
              <span className="mr-3 text-xl font-medium">21:00-22:00</span>
              <div className="border-secondary-color mr-3 h-6 w-60 rounded-full border bg-[#F5F5F5]">
                <div className="bg-primary border-secondary-color h-6 w-60 rounded-full"></div>
                <span className="text-xl font-medium">%90</span>
              </div>
            </div>

            <div className="flex items-center">
              <Image
                src="/images/clock.svg"
                alt="clock icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="mr-3 text-xl font-medium">18:00-19:00</span>
              <div className="border-secondary-color mr-3 h-6 w-60 rounded-full border bg-[#F5F5F5]">
                <div className="bg-primary border-secondary-color h-6 w-[167px] rounded-full"></div>
              </div>
              <span className="text-xl font-medium">%70</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
