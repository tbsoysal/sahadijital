export default function BenefitBox3() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      {/* Text Content */}
      <div className="benefitTextContainer tablet:rounded-tr-none rounded-t-[20px] bg-[#FEEE95]">
        <h3 className="leading-[44px]ont-bold mb-8 text-3xl">
          Tesisinizi Dijitalleştirin
        </h3>
        <p className="text-secondary-color text-xl leading-7 font-medium">
          Rakipleriniz hala defter kullanırken siz dijital yönetime geçin.
          Müşteri memnuniyetini arttırın, işletmenizi büyütün.
        </p>
      </div>
      {/* Image content */}
      <div className="benefitImageContainer">
        <div className="mx-auto">
          <div className="grid w-[460px] grid-cols-2 gap-6">
            {/* Card */}
            <div className="border-effect w-[218px] rounded-2xl p-8 before:rounded-2xl after:rounded-2xl">
              <p className="mb-4 text-xl font-medium text-[#D92D20]">Öncesi</p>
              <ul className="mb-4 list-disc pl-5 text-base marker:text-[#F97066]">
                <li>Kayıp defterler</li>
                <li>Manuel takip</li>
                <li>Zaman kaybı</li>
              </ul>
              <span className="mb-4 block h-px max-w-[154px] bg-[#E9EAEB]"></span>
              <p className="mb-1 text-base font-medium">Müşteri kaybı</p>
              <p className="text-4xl font-bold text-[#D92D20]">-%20</p>
            </div>

            {/* Card */}
            <div className="border-effect w-[218px] rounded-2xl p-8 before:rounded-2xl after:rounded-2xl">
              <p className="mb-4 text-xl font-medium text-[#039855]">Sonrası</p>
              <ul className="mb-4 list-disc pl-5 text-base marker:text-[#32D583]">
                <li className="min-w-max">Online rezervasyon</li>
                <li>Mobil takip</li>
                <li>Gelir takibi</li>
              </ul>
              <span className="mb-4 block h-px max-w-[154px] bg-[#E9EAEB]"></span>
              <p className="mb-1 text-base font-medium">Müşteri artışı</p>
              <p className="text-4xl font-bold text-[#039855]">+%40</p>
            </div>

            <div className="border-effect col-span-2 rounded-2xl bg-[#FEEE95] p-8 before:rounded-2xl after:rounded-2xl">
              <p className="text-xl font-medium">
                İşletmeler ortalama 6 ay içinde daha fazla rezervasyon ve gelir
                artışı sağlıyor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
