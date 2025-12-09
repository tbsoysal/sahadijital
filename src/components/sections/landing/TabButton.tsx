import { cn } from "@/lib/utils";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "border-primary-color tablet:text-xl desktop:text-2xl min-w-max rounded-full border border-r-2 border-b-2 px-5 py-3 text-base font-medium transition-all duration-200",
      isActive ? "bg-primary text-white" : "text-primary-color bg-white",
    )}
  >
    {label}
  </button>
);

export default TabButton;

