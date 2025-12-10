export default function BenefitBox3() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      {/* Text Content */}
      <div className="benefitTextContainer tablet:rounded-tr-none rounded-t-[20px] bg-[#FEEE95]">
        <h3 className="tablet:text-[32px] desktop:text-[40px] mb-8 text-2xl leading-8 font-bold">
          Tesisinizi Dijitalleştirin
        </h3>
        <p className="text-secondary-color tablet:text-xl desktop:text-2xl tablet:leading-7 desktop:leading-8 text-base leading-6 font-medium">
          Rakipleriniz hala defter kullanırken siz dijital yönetime geçin.
          Müşteri memnuniyetini arttırın, işletmenizi büyütün.
        </p>
      </div>
      {/* Image content */}
      <div className="benefitImageContainer">
        <div className="mx-auto">
          <div className="border-primary-color tablet:max-w-[500px] tablet:border-none tablet:gap-6 tablet:p-0 tablet:justify-between mx-auto mb-6 flex max-w-[350px] shrink-0 justify-evenly rounded-2xl border border-r-4 border-b-4 p-3">
            {/* Card */}
            <div className="tablet:border tablet:border-primary-color tablet:border-r-4 tablet:border-b-4 tablet:p-8 tablet:rounded-2xl">
              <p className="tablet:text-xl desktop:text-2xl mb-4 text-sm font-medium text-[#D92D20]">
                Öncesi
              </p>
              <ul className="tablet:text-lg desktop:text-xl mb-4 w-max list-disc pl-5 text-[12px] marker:text-[#F97066]">
                <li>Kayıp defterler</li>
                <li>Manuel takip</li>
                <li>Zaman kaybı</li>
              </ul>
              <span className="mb-4 block h-px max-w-[154px] bg-[#E9EAEB]"></span>
              <p className="tablet:text-lg desktop:text-xl mb-1 text-center text-[12px] font-medium">
                Müşteri kaybı
              </p>
              <p className="tablet:text-[32px] desktop:text-[40px] text-center text-xl font-bold text-[#D92D20]">
                -%20
              </p>
            </div>

            {/* Card */}
            <div className="tablet:border tablet:max-w-[500px] tablet:border-primary-color tablet:border-r-4 tablet:border-b-4 tablet:p-8 tablet:rounded-2xl">
              <p className="tablet:text-xl desktop:text-2xl mb-4 text-sm font-medium text-[#039855]">
                Sonrası
              </p>
              <ul className="tablet:text-lg desktop:text-xl mb-4 list-disc pl-5 text-[12px] marker:text-[#32D583]">
                <li className="min-w-max">Online rezervasyon</li>
                <li>Mobil takip</li>
                <li>Gelir takibi</li>
              </ul>
              <span className="mb-4 block h-px max-w-[154px] bg-[#E9EAEB]"></span>
              <p className="tablet:text-lg desktop:text-xl mb-1 text-center text-[12px] font-medium">
                Müşteri artışı
              </p>
              <p className="tablet:text-[32px] desktop:text-[40px] text-center text-xl font-bold text-[#039855]">
                +%40
              </p>
            </div>
          </div>

          <div className="border-primary-color tablet:max-w-[500px] max-w-[350px] rounded-2xl border border-r-4 border-b-4 bg-[#FEEE95] p-8">
            <p className="tablet:text-xl desktop:text-2xl text-base font-medium">
              İşletmeler ortalama 6 ay içinde daha fazla rezervasyon ve gelir
              artışı sağlıyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
