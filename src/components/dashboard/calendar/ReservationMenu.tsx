import InputBox from "@/components/auth/InputBox";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export function ReservationMenu({
  isOpen,
  selectedSlot,
  setSelectedSlot,
}: {
  isOpen: boolean;
  selectedSlot: {
    day: Date;
    hour: number;
  } | null;
  setSelectedSlot: React.Dispatch<
    React.SetStateAction<{
      day: Date;
      hour: number;
    } | null>
  >;
}) {
  let formattedDate: string | Date = new Date();
  if (selectedSlot) {
    formattedDate = format(selectedSlot?.day, "d MMMM, EEEE", {
      locale: tr,
    });
  }
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-10 h-[580px] transform bg-white transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"} `}
    >
      {/* Cancel & Save Buttons */}
      <div className="flex justify-between border-b border-[#E9EAEB] px-5 py-4">
        <button
          onClick={() => setSelectedSlot(null)}
          className="font-satoshi text-base font-medium"
        >
          Vazgeç
        </button>
        <button className="font-satoshi text-base font-medium">Kaydet</button>
      </div>

      {/* Name & Lastname */}
      <div className="border-b border-[#E9EAEB]">
        <p className="text-primary pt-5 pb-1 pl-5 font-medium">
          Rezervasyon Bilgileri
        </p>
        <div className="flex items-center gap-5 px-5 py-4">
          <Image
            src="/images/profile-icon.svg"
            alt="profile icon"
            width={20}
            height={20}
          />
          <InputBox
            type="text"
            placeholder="Ad & Soyad"
            className="border-none p-0! outline-none"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex gap-5 border-b border-[#E9EAEB] px-5 py-4">
        <Image
          src="/images/phone-icon.svg"
          alt="phone icon"
          width={20}
          height={20}
        />
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-black">+90</span>
          <span className="h-7 w-px bg-[#E9EAEB]"></span>
          <InputBox
            type="text"
            placeholder="___ ___ __ __"
            className="border-none p-0! outline-none"
          />
        </div>
      </div>

      {/* Date  */}
      <div className="flex gap-5 border-b border-[#E9EAEB] px-5 py-4">
        <Image
          src="/images/date-icon.svg"
          alt="date icon"
          width={20}
          height={20}
        />
        <p className="text-lg font-medium text-black">
          {formattedDate.toString()}
        </p>
      </div>

      {/* Time */}
      <div className="flex gap-5 border-b border-[#E9EAEB] px-5 py-4">
        <Image
          src="/images/clock-icon.svg"
          alt="clock icon"
          width={20}
          height={20}
        />
        <div className="flex gap-5">
          <p className="text-base font-medium text-black">
            {selectedSlot?.hour! - 1 + ":00"}
          </p>
          <span className="h-full w-px bg-[#E9EAEB]"></span>
          <p className="text-base font-medium text-black">
            {selectedSlot?.hour + ":00"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="flex items-center gap-5 border-b border-[#E9EAEB] px-5 py-4">
        <Image
          src="/images/textbox-icon.svg"
          alt="text icon"
          width={20}
          height={20}
        />
        <InputBox
          type="text"
          placeholder="Açıklama ekle"
          className="border-none p-0! outline-0"
        />
      </div>

      {/* Payment Status */}
      <div className="mb-5 border-b border-[#E9EAEB] px-5 py-4">
        <p className="text-primary pb-4 font-medium">Ödeme Bilgileri</p>
        <div className="flex items-center justify-between gap-5">
          <Image
            src="/images/credit-card-icon.svg"
            alt="payment icon"
            width={20}
            height={20}
          />
          <div className="flex items-center gap-1">
            <span className="text-lg text-[#717680]">₺</span>
            <input
              placeholder="2000"
              className="max-w-[100px] border-0 p-0! text-lg font-medium text-black outline-0"
            />
          </div>
          <div>
            <label className="flex items-center gap-1 font-medium">
              <input type="checkbox" className="h-4 w-4"></input>
              Ödeme yapıldı
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
