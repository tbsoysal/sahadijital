import Image from "next/image";

export default function BenefitBox4() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      <div className="benefitImageContainer tablet:rounded-[20px] tablet:rounded-r-none tablet:p-8 rounded-t-[20px] rounded-b-none bg-[#CEEAB0] pb-0">
        <Image
          src="/images/benefitMobileBefore.png"
          alt="before after image"
          width={418}
          height={482}
          className="tablet:hidden mx-auto"
        />
        <Image
          src="/images/benefitBefore.png"
          alt="before after image"
          width={418}
          height={482}
          className="tablet:block mx-auto hidden"
        />
      </div>
      <div className="benefitImageContainer tablet:p-8 bg-[#FEEE95] pb-0">
        <Image
          src="/images/benefitMobileAfter.png"
          alt="before after image"
          width={418}
          height={482}
          className="tablet:hidden mx-auto"
        />
        <Image
          src="/images/benefitAfter.png"
          alt="before after image"
          width={418}
          height={482}
          className="tablet:block mx-auto hidden"
        />
      </div>
    </div>
  );
}
