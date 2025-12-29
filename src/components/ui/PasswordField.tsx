import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const PasswordField = ({ register, error }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="text-secondary-color mb-1.5 block text-base font-medium">
        Şifre
      </label>
      <div
        className={`relative w-full rounded-lg border border-r-2 border-b-2 border-[#A4A7AE] bg-white ${error ? "border-[#F97066]" : ""}`}
      >
        <input
          {...register}
          type={show ? "text" : "password"}
          className="w-full rounded-lg px-3 py-2 pr-10 text-black outline-none"
          placeholder="******"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 px-4 text-gray-400"
        >
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};
