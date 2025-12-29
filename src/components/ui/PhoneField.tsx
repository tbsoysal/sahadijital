import { FieldErrors, UseFormRegister } from "react-hook-form";

type FormValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  fieldName: string;
  password: string;
};

interface Props {
  error: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
}

export default function PhoneField({ error, register }: Props) {
  return (
    <div>
      <label className="text-secondary-color mb-1.5 block text-base font-medium">
        Telefon Numarası
      </label>
      <div
        className={`flex w-full rounded-lg border border-r-2 border-b-2 border-[#A4A7AE] ${error.phone ? "border-[#F97066]" : ""}`}
      >
        <span className="text-secondary-color block rounded-l-lg bg-white px-2 py-2 font-medium focus:outline-none">
          +90
        </span>
        <input
          {...register("phone")}
          name="phone"
          type="tel"
          placeholder="5*********"
          className="flex-1 rounded-r-lg border-l border-[#A4A7AE] bg-white px-3 py-2 font-medium focus:outline-none"
        />
      </div>
      {error.phone && (
        <span className="tablet:text-sm desktop:text-base mt-1.5 text-[12px] text-red-500">
          {error.phone.message}
        </span>
      )}
    </div>
  );
}
