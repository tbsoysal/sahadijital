"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { AlignJustify } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen flex-col bg-[#F5F5F5]">
      {/* 1. The Backdrop Layer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <header className="flex h-14 items-center justify-between px-5">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="cursor-pointer p-1 transition-colors hover:bg-gray-200"
        >
          <AlignJustify className="h6 w-6" />
        </button>

        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>
      <div>{children}</div>
    </div>
  );
}
