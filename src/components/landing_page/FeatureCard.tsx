import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  image?: string;
  heading: string;
  paragraph: string;
  color: string;
  className?: string;
};

export default function FeatureCard({
  image = "/images/featuresimage-1.png",
  heading,
  paragraph,
  color,
  className,
}: Props) {
  return (
    <div className={className}>
      <div
        className={cn(
          "relative mb-8 flex h-[350px] items-center justify-center overflow-hidden rounded-[20px] border border-r-4 border-b-4 before:rounded-[20px] after:rounded-[20px]",
          color,
        )}
      >
        <Image
          src={image}
          alt="Feature image"
          fill
          className="object-contain p-3"
        />
      </div>
      <h3 className="tablet:text-[28px] desktop:text-[32px] mb-3 text-xl font-bold">
        {heading}
      </h3>
      <p className="text-secondary-color tablet:text-xl desktop:text-2xl text-base font-medium">
        {paragraph}
      </p>
    </div>
  );
}
