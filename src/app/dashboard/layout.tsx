"use client";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import {
  useDashboardContext,
  DashboardProvider,
} from "@/context/DashboardContext";
import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardContent>{children}</DashboardContent>
    </DashboardProvider>
  );
}

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { userData, isSidebarOpen, setIsSidebarOpen } = useDashboardContext();

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Backdrop — mobile only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-5 py-4 shadow-sm md:static md:mx-8 md:rounded-lg">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="cursor-pointer p-1 transition-colors hover:bg-gray-200 md:hidden"
          >
            <AlignJustify className="h6 w-6" />
          </button>

          {/* Center: Logo + App Name — mobile only */}
          <Link
            href="/dashboard"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 md:static md:translate-x-0"
          >
            <Image
              src="/images/sahadijital-logo.svg"
              alt="SahaDijital Logo"
              width={28}
              height={28}
            />
            <span className="text-primary text-sm font-bold">SahaDijital</span>
          </Link>

          {/* Right Side: Business Name */}
          <p className="ml-auto max-w-[30%] truncate text-sm text-gray-600">
            {userData.businessName}
          </p>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto md:p-8">{children}</div>
      </div>
    </div>
  );
}
