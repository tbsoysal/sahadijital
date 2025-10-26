import Link from "next/link";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export function Button({ href, variant = "primary", children, className = "" }: ButtonProps) {
  const baseStyles = "font-medium px-4 py-3 shadow-[-1px_-1px_0_0_#181D27,_3px_3px_0_0_#181D27] rounded-lg hover:shadow-[-1px_-1px_0_0_#181D27,_1px_1px_0_0_#181D27] transition-all";

  const variants = {
    primary: "bg-[#12B76A] text-white active:bg-[#027A48]",
    secondary: "bg-white text-black"
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
