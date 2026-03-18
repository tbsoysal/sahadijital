import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tablet:py-16 desktop:py-20 min-h-screen bg-linear-to-b from-[#93CFEC] to-[#F6FFE8] px-5 py-12">
      <Link href={"/"} className="flex items-center justify-center gap-1">
        <Image
          src={"/images/sahadijital-logo.svg"}
          alt="Saha Dijital Logo"
          width={32}
          height={30}
        ></Image>
        <span className="text-xl font-bold">
          Saha <span className="text-primary">Dijital</span>
        </span>
      </Link>
      {children}
    </div>
  );
}
