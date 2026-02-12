import InputBox from "@/components/auth/InputBox";
import Image from "next/image";

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
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-10 h-[510px] transform bg-white transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"} `}
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
    </div>
  );
}
