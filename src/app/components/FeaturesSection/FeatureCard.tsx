import Image from "next/image";

type Props = {
  heading: string;
  paragraph: string;
  imagePath: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const FeatureCard = ({
  heading,
  paragraph,
  imagePath,
  className,
  imageWidth = 536,
  imageHeight = 264
}: Props) => {
  return (
    <div className='w-full'>
      {/* Image Container: Fixed height, centers items */}
      <div
        className={`${className} flex justify-center items-center rounded-2xl p-5 border-t-[1px] border-l-[1px] border-r-[4px] border-b-[4px] border-[#181D27] w-full h-[260px] sm:h-[300px] lg:h-[340px] mb-5 lg:mb-10`}
      >
        <div className="w-full h-full relative">
          <Image
            src={imagePath}
            alt={heading || "Feature image"}
            width={imageWidth}
            height={imageHeight}
            className="object-contain"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{heading}</h3>
      <p className="text-xl font-medium text-[#414651]">{paragraph}</p>
    </div>
  )
}

export default FeatureCard;
