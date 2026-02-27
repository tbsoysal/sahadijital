import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function InputBox(props: Props) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label className="text-secondary-color text-base font-medium">
        {props.label}
      </label>
      <input
        {...props}
        className={`w-full rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-xl font-medium ${props.className}`}
      ></input>
    </div>
  );
}
