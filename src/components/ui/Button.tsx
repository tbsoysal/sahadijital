import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const baseStyles =
  "cursor-pointer inline-flex items-center justify-center transition-shadow duration-200 rounded-lg text-sm font-medium shadow-[2px_2px_0_#181D27] border-1 border-[#181D27] hover:shadow-none focus:outline-none px-6 py-3";

const variantStyles = {
  primary: "bg-[#12B76A] text-white active:bg-[#027A48]",
  secondary:
    "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary", // Default variant
  className = "",
  ...rest // Capture remaining standard button props (e.g., onClick, type, disabled)
}) => {
  const classes = cn(baseStyles, variantStyles[variant], className);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
