import Image from "next/image"

interface Props {
    author: string;
    comment: string;
    star: number;
    date: string;
}

export default function TestimonialCard({ author, comment, star, date }: Props) {
    return (
        <div className="bg-[#FEF7C3] mx-auto border-effect rounded-[20px] before:rounded-[20px] after:rounded-[20px] p-10">
            <div className="flex items-center gap-3 mb-4">
                <Image src="/images/profile-photo.png" alt="profile photo" width={44} height={44} />
                <p className="font-medium text-xl">{author}</p>
            </div>
            <p className="font-medium text-xl mb-6">{comment}</p>
            <span className="block w-full h-[1px] border border-primary-color border-dashed mb-6"></span>
            <div className="flex items-center gap-3">
                <div className="flex gap-1 items-center">
                    <Image src="/images/starIcon.svg" alt="star icon" width={24} height={24} />
                    <Image src="/images/starIcon.svg" alt="star icon" width={24} height={24} />
                    <Image src="/images/starIcon.svg" alt="star icon" width={24} height={24} />
                    <Image src="/images/starIcon.svg" alt="star icon" width={24} height={24} />
                    <Image src="/images/starIcon.svg" alt="star icon" width={24} height={24} />
                </div>
                <span className="block w-[1px] h-[20px] bg-primary-color"></span>
                <p className="leading-normal">{date}</p>
            </div>
        </div>
    )
}