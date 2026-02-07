"use client";

import Button from "@/components/Button";
import Sidebar from "@/components/dashboard/header/Sidebar";
import { AlignJustify } from "lucide-react";
import { useFields } from "@/lib/hooks/dashboard/useSidebar";
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

          {/* Date control buttons */}
          <div className="flex items-center gap-1">
            <Button className="p-2">
              <svg
                width="7"
                height="8"
                viewBox="0 0 7 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 4.4656C-0.166667 4.0807 -0.166667 3.11845 0.5 2.73355L5 0.13547C5.66667 -0.24943 6.5 0.231695 6.5 1.00149L6.5 6.19765C6.5 6.96745 5.66667 7.44857 5 7.06367L0.5 4.4656Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button className="p-2">
              <svg
                width="7"
                height="8"
                viewBox="0 0 7 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.73355C6.66667 3.11845 6.66667 4.0807 6 4.4656L1.5 7.06367C0.833334 7.44857 3.27826e-07 6.96745 3.27826e-07 6.19765V1.00149C3.27826e-07 0.231695 0.833333 -0.249431 1.5 0.135469L6 2.73355Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
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
