"use client";

import { useDashboard } from "@/lib/hooks/dashboard/useDashboard";
import { createContext, ReactNode, useContext } from "react";

type DashboardContextType = ReturnType<typeof useDashboard>;

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const value = useDashboard();

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
};
