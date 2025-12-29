import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  className?: React.HTMLAttributes<HTMLElement>["className"];
  errors: FieldError | undefined;
}

export default function Input({
  label,
  type,
  placeholder,
  className = "",
  errors,
  ...props
}: InputProps) {
  return (
    <div className={className}>
      <label className="text-secondary-color tablet:text-base tablet:leading-6 desktop:text-lg desktop:leading-[26px] mb-1.5 block text-[12px] leading-[18px] font-medium">
        {label}
      </label>
      <div
        className={`w-full rounded-lg border border-r-2 border-b-2 border-[#A4A7AE] ${errors ? "border-[#F97066]" : ""}`}
      >
        <input
          {...props}
          type={type}
          placeholder={placeholder}
          className="tablet:text-lg tablet:leading-[26px] desktop:text-xl desktop:leading-7 w-full rounded-lg bg-white px-3 py-2 text-sm leading-5 font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
        />
      </div>
      {errors && (
        <span className="tablet:text-sm desktop:text-base mt-1.5 text-[12px] text-red-500">
          {errors.message}
        </span>
      )}
    </div>
  );
}
