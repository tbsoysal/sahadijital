import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
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
      <label className="text-secondary-color mb-1.5 block text-base font-medium">
        {label}
      </label>
      <div
        className={`border-effect w-full rounded-lg before:rounded-lg after:rounded-lg after:border-r-2 after:border-b-2 ${errors ? "before:border-red-600 after:border-red-600" : ""}`}
      >
        <input
          {...props}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg bg-white px-3 py-2 focus:outline-none"
        />
      </div>
      {errors && (
        <span className="mt-1.5 text-sm text-red-500">{errors.message}</span>
      )}
    </div>
  );
}
