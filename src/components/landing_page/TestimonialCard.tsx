import Image from "next/image";

interface Props {
  author: string;
  comment: string;
  date: string;
  starNumber: number;
}

export default function TestimonialCard({
  author,
  comment,
  date,
  starNumber,
}: Props) {
  return (
    <div className="border-primary-color desktop:p-10 mx-auto rounded-[20px] border border-r-4 border-b-4 bg-[#FEF7C3] p-8">
      <div className="mb-4 flex items-center gap-3">
        <Image
          src="/images/profile-photo.png"
          alt="profile photo"
          width={44}
          height={44}
        />
        <p className="tablet:text-xl desktop:text-2xl text-base font-medium">
          {author}
        </p>
      </div>
      <p className="tablet:text-xl desktop:text-2xl mb-6 text-base font-medium">
        {comment}
      </p>
      <span className="border-primary-color mb-6 block h-px w-full border border-dashed"></span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: starNumber }).map((_, i) => (
            <Image
              key={i}
              src="/images/fullStar.svg"
              alt="star icon"
              width={20}
              height={20}
            />
          ))}
          {Array.from({ length: 5 - starNumber }).map((_, i) => (
            <Image
              key={i}
              src="/images/emptyStar.svg"
              alt="star icon"
              width={20}
              height={20}
            />
          ))}
        </div>
        <span className="bg-primary-color block h-5 w-px"></span>
        <p className="tablet:text-lg desktop:text-xl text-sm leading-normal">
          {date}
        </p>
      </div>
    </div>
  );
}
