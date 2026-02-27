import Image from "next/image";
import Link from "next/link";

type Props = {
  label: string;
  icon: string;
  destination: string;
};

export default function MenuItem({ label, icon, destination }: Props) {
  return (
    <Link
      href={destination}
      className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-200"
    >
      <Image src={icon} alt="item icon" width={20} height={20} />
      <span className="text-base font-medium">{label}</span>
    </Link>
  );
}
