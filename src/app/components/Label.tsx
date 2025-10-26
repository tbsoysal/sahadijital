import Image from "next/image"

const Label = ({ children, className = "" }: { children: React.ReactNode, className: string }) => {
  return (
    <div className={`flex max-w-max gap-2.5 bg-white rounded-full py-2 px-4 border-[#181D27] border-[2px] ${className}`}>
      <Image
        src="/images/labelstar-icon.svg"
        alt="stars"
        width={20}
        height={20}
      />
      <span>{children}</span>
    </div>
  )
}

export default Label;
