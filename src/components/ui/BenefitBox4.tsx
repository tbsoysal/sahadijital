import Image from "next/image";

export default function BenefitBox4() {
    return (
        <div className="benefitContainer border-effect ">
            <div className="benefitImageContainer rounded-b-none rounded-t-[20px] bg-[#CEEAB0] tablet:rounded-[20px] tablet:rounded-r-none ">
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
    )
}