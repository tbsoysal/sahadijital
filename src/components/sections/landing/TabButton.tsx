import { cn } from "@/lib/utils"

interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "border-effect rounded-full min-w-max px-5 py-3 font-medium text-xl transition-all duration-200",
      isActive ? "btn-primary" : "btn-secondary"
    )}
  >
    {label}
  </button>
)

export default TabButton;