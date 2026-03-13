import { cn } from "@/lib/utils";
import { useDashboardContext } from "@/context/DashboardContext";

export function FieldMenu() {
  const { fields, selectedField, setSelectedField } = useDashboardContext();

  return (
    <ul className="border-t border-b border-gray-200 py-4">
      {fields &&
        fields.map((field) => (
          <li
            key={field.id}
            onClick={() => setSelectedField(field)}
            className={cn(
              "cursor-pointer rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-50",
              selectedField?.id == field.id ? "bg-[#f5f5f5]" : "bg-transparent",
            )}
          >
            {field.name}
          </li>
        ))}
    </ul>
  );
}
