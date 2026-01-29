import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Badge({ className }: Props) {
  return (
    <div
      className={cn(
        "border-primary-color tablet:mb-6 desktop:mb-8 mx-auto mb-5 flex max-w-max items-center gap-1.5 rounded-full border bg-white px-3 py-1",
        className,
      )}
    >
      <Image
        src="/images/starIcon.svg"
        alt="star icon"
        width={16}
        height={16}
        className="h-4 w-4"
      />
      <span className="tablet:text-lg desktop:text-xl text-base font-medium">
        Modern rezervasyon sistemi
      </span>
    </div>
  );
}
