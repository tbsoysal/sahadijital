import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  className?: string;
}

export default function Badge({ className }: Props) {
  return (
    <div className={cn(
      "max-w-max flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full mx-auto border border-primary-color mb-5"
      , className
    )} >
      <Image
        src="/images/labelstar-icon.svg"
        alt="star icon"
        width={20}
        height={20}
      />
      <span className="font-medium text-base">Modern rezervasyon sistemi</span>
    </ div>
  )
}
