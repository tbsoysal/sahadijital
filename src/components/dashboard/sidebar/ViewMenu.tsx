"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";
import { VIEWS } from "@/lib/constants";

export function ViewMenu() {
  const { selectedView, setSelectedView, setIsSidebarOpen } = useDashboardContext();

  return (
    <ul className="mb-4">
      {VIEWS.map((item) => {
        item.selected = selectedView.label === item.label;

        return (
          <li key={item.label}>
            <button
              onClick={() => { setSelectedView(item); setIsSidebarOpen(false); }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors",
                "text-base font-medium",
                item.selected ? "bg-primary text-white" : "hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
