import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  image?: string;
  heading: string;
  paragraph: string;
  color: string;
  className?: string;
}

export default function FeatureCard({ image = "/images/featuresimage-1.png", heading, paragraph, color, className }: Props) {
  return (
    <div className={className}>
      <div className={cn("relative flex justify-center items-center overflow-hidden h-[344px] border-effect mb-8 rounded-[20px] after:rounded-[20px] before:rounded-[20px]", color)}>
        <Image
          src={image}
          alt="Feature image"
          fill
          className="object-contain max-h-[80%] top-1/2! -translate-y-1/2"
        />
      </div>
      <h3 className="font-bold text-2xl mb-3">{heading}</h3>
      <p className="font-medium text-xl text-secondary-color">{paragraph}</p>
    </div>
  )
}
