export default function BenefitBox3() {
    return (
        <div className="benefitContainer border-effect">
            {/* Text Content */}
            <div className="benefitTextContainer bg-[#FEEE95]">
                <h3 className="font-bold text-3xl leading-[44px] mb-8">Tesisinizi Dijitalleştirin</h3>
                <p className="font-medium text-xl text-secondary-color leading-[28px]">Rakipleriniz hala defter kullanırken siz dijital yönetime geçin. Müşteri memnuniyetini arttırın, işletmenizi büyütün.</p>
            </div>
            {/* Image content */}
            <div className="benefitImageContainer">
                <div className="mx-auto">
                    <div className="w-[460px] grid grid-cols-2 gap-6">
                        {/* Card */}
                        <div className="w-[218px] border-effect rounded-[16px] before:rounded-[16px] after:rounded-[16px] p-8">
                            <p className="text-[#D92D20] font-medium text-xl mb-4">Öncesi</p>
                            <ul className="text-base mb-4 list-disc marker:text-[#F97066] pl-5">
                                <li>Kayıp defterler</li>
                                <li>Manuel takip</li>
                                <li>Zaman kaybı</li>
                            </ul>
                            <span className="block max-w-[154px] h-[1px] mb-4 bg-[#E9EAEB]"></span>
                            <p className="font-medium text-base mb-1">Müşteri kaybı</p>
                            <p className="text-[#D92D20] font-bold text-4xl">-%20</p>
                        </div>

                        {/* Card */}
                        <div className="w-[218px] border-effect rounded-[16px] before:rounded-[16px] after:rounded-[16px] p-8">
                            <p className="text-[#039855] font-medium text-xl mb-4">Sonrası</p>
                            <ul className="text-base mb-4 list-disc marker:text-[#32D583] pl-5">
                                <li className="min-w-max">Online rezervasyon</li>
                                <li>Mobil takip</li>
                                <li>Gelir takibi</li>
                            </ul>
                            <span className="block max-w-[154px] h-[1px] mb-4 bg-[#E9EAEB]"></span>
                            <p className="font-medium text-base mb-1">Müşteri artışı</p>
                            <p className="text-[#039855] font-bold text-4xl">+%40</p>
                        </div>

                        <div className="col-span-2 bg-[#FEEE95] border-effect rounded-[16px] before:rounded-[16px] after:rounded-[16px] p-8">
                            <p className="font-medium text-xl">İşletmeler ortalama 6 ay içinde daha fazla rezervasyon ve gelir artışı sağlıyor.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}