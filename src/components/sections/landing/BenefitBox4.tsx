import Image from "next/image";

export default function BenefitBox4() {
  return (
    <div className="benefitContainer border-primary-color border border-r-4 border-b-4">
      <div className="benefitImageContainer tablet:rounded-[20px] tablet:rounded-r-none rounded-t-[20px] rounded-b-none bg-[#CEEAB0]">
        <Image
          src="/images/benefitBefore.png"
          alt="before after image"
          width={418}
          height={482}
          className="mx-auto"
        />
      </div>
      <div className="benefitImageContainer bg-[#C3B1FE]">
        <Image
          src="/images/benefitAfter.png"
          alt="before after image"
          width={418}
          height={482}
          className="mx-auto"
        />
      </div>
    </div>
  );
}

