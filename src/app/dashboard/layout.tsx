"use client";

import Sidebar from "@/components/dashboard/header/Sidebar";
import { AlignJustify } from "lucide-react";
import { useFields } from "@/lib/hooks/dashboard/useFields";
import Avatar from "@/components/dashboard/header/Avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen, setIsSidebarOpen, businessName, firstName, lastName } =
    useFields();

  return (
    <div className="flex h-screen flex-col bg-[#F5F5F5]">
      {/* 1. The Backdrop Layer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header Bar */}
      <header className="sticky top-0 right-0 left-0 z-10 flex h-14 items-center justify-between bg-[#F5F5F5] px-5 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="cursor-pointer p-1 transition-colors hover:bg-gray-200"
          >
            <AlignJustify className="h6 w-6" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <p className="border-r border-[#E9EAEB] pr-3 text-sm font-medium">
            {businessName}
          </p>
          <Avatar firstName={firstName} lastName={lastName} />
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div>{children}</div>
    </div>
  );
}
