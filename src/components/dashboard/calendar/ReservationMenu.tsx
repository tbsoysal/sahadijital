import InputBox from "@/components/auth/InputBox";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useCreateReservation } from "@/lib/hooks/dashboard/useCreateReservation";
import { useFields } from "@/lib/hooks/dashboard/useFields";
import { NotificationModal } from "@/components/NotificationModal";
import { ReservationFormData, SelectedSlot } from "@/lib/hooks/dashboard/types";
import { useUpdateReservation } from "@/lib/hooks/dashboard/useUpdateReservation";

// Default reservation state (reusable for reset)
function getInitialReservation(
  selectedSlot: SelectedSlot,
): ReservationFormData {
  return {
    customerName: "",
    customerPhone: "",
    date: selectedSlot
      ? format(selectedSlot.day, "yyyy-MM-dd", { locale: tr })
      : "",
    startTime: selectedSlot
      ? `${String(Math.max(selectedSlot.hour - 1, 0)).padStart(2, "0")}:00`
      : "00:00",
    endTime: selectedSlot
      ? `${String(selectedSlot.hour).padStart(2, "0")}:00`
      : "00:00",
    price: "0",
    paid: false,
    note: "",
  };
}

export function ReservationMenu({
  isOpen,
  selectedSlot,
  setSelectedSlot,
  onReservationSaved,
}: {
  isOpen: boolean;
  selectedSlot: SelectedSlot
  setSelectedSlot: React.Dispatch<React.SetStateAction<SelectedSlot | null>>;
  onReservationSaved?: () => void;
}) {
  const { createReservation, isSaving, saveError, setSaveError } =
    useCreateReservation();
  const { selectedField } = useFields();
  const [reservationForm, setReservationForm] = useState<ReservationFormData>(() =>
    getInitialReservation(selectedSlot),
  );
  const { updateReservation } = useUpdateReservation()

  const handleSave = async () => {
    if (!selectedField) return;

    if (selectedSlot?.reservation?.id) {
      const result = await updateReservation(selectedSlot.reservation.id, reservationForm);

      if (result.success) {
        onReservationSaved?.();
        setSelectedSlot(null);
      } else {
        setSaveError("Güncelleme sırasında bir hata oluştu");
      }
    } else {
      const result = await createReservation({
        ...reservationForm,
      });

      if (result.success) {
        setReservationForm(getInitialReservation(null));
        onReservationSaved?.();
        setSelectedSlot(null);
      }
    }
  };

  useEffect(() => {
    if (selectedSlot) {
      if (selectedSlot.reservation) {
        const res = selectedSlot.reservation;

        setReservationForm({
          customerName: res.customer_name || "",
          customerPhone: res.customer_phone || "",
          date: format(selectedSlot.day, "yyyy-MM-dd"),
          // Saat formatlarını veritabanından gelen veriye göre ayarla
          startTime: format(new Date(res.start_time), "HH:mm"),
          endTime: format(new Date(res.end_time), "HH:mm"),
          price: String(res.price || ""),
          paid: res.paid,
          note: res.note || "",
        })
      } else {
        const freshReservation = getInitialReservation(selectedSlot);
        setReservationForm(freshReservation);
      }
    }
  }, [selectedSlot, selectedSlot?.reservation?.id, selectedSlot?.day, selectedSlot?.hour]);

  function updateFormField<K extends keyof ReservationFormData>(
    key: K,
    value: ReservationFormData[K],
  ) {
    setReservationForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-10 h-[580px] transform bg-white transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"} `}
    >
      {selectedSlot ? (
        <>
          {/* Cancel & Save Buttons */}
          <div className="flex justify-between border-b border-[#E9EAEB] px-5 py-4">
            <button
              onClick={() => setSelectedSlot(null)}
              className="font-satoshi text-base font-medium"
            >
              Vazgeç
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="font-satoshi text-base font-medium"
            >
              {isSaving
                ? "Kaydediliyor..." : (selectedSlot?.reservation ? "Güncelle" : "Kaydet")}
            </button>
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
                value={reservationForm.customerName}
                onChange={(e) =>
                  updateFormField("customerName", e.target.value)
                }
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
                value={reservationForm.customerPhone}
                onChange={(e) =>
                  updateFormField("customerPhone", e.target.value)
                }
              />
            </div>
          </div>
          {/* Date */}
          <div className="flex gap-5 border-b border-[#E9EAEB] px-5 py-4">
            <Image
              src="/images/date-icon.svg"
              alt="date icon"
              width={20}
              height={20}
            />
            <p className="text-lg font-medium text-black">
              {reservationForm.date
                ? format(new Date(reservationForm.date), "d MMMM, EEEE", {
                  locale: tr,
                })
                : ""}
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
                {reservationForm.startTime}
              </p>
              <span className="h-full w-px bg-[#E9EAEB]"></span>
              <p className="text-base font-medium text-black">
                {reservationForm.endTime}
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
              value={reservationForm.note}
              onChange={(e) => updateFormField("note", e.target.value)}
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
                  value={reservationForm.price}
                  onChange={(e) => updateFormField("price", e.target.value)}
                  placeholder="2000"
                  className="max-w-[100px] border-0 p-0! text-lg font-medium text-black outline-0"
                />
              </div>
              <div>
                <label className="flex items-center gap-1 font-medium">
                  <input
                    type="checkbox"
                    checked={reservationForm.paid}
                    onChange={() => {
                      setReservationForm((prev) => ({ ...prev, paid: !reservationForm.paid }))
                    }}
                    className="h-4 w-4"
                  ></input>
                  Ödeme yapıldı
                </label>
              </div>
            </div>
          </div>
        </>
      ) : null
      }
      {
        saveError && (
          <NotificationModal
            open={true}
            variant="error"
            title="Bir sorun oluştu"
            message={saveError}
            actionText="Tamam"
            onAction={() => setSaveError(null)}
          />
        )
      }
    </div >
  );
}
