"use client";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import {
  useDashboardContext,
  DashboardProvider,
} from "@/context/DashboardContext";
import React from "react";

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
    <div className="flex h-screen flex-col bg-[#F5F5F5]">
      {/* 1. The Backdrop Layer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header Bar */}
      <header className="sticky top-0 right-0 left-0 z-10 flex h-14 items-center justify-between bg-white px-5 py-4 shadow-sm">
        {/* Left Side */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="cursor-pointer p-1 transition-colors hover:bg-gray-200"
        >
          <AlignJustify className="h6 w-6" />
        </button>

        {/* Center: Logo + App Name */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <Image
            src="/images/sahadijital-logo.svg"
            alt="SahaDijital Logo"
            width={28}
            height={28}
          />
          <span className="text-primary text-sm font-bold">SahaDijital</span>
        </div>

        {/* Right Side: Business Name */}
        <p className="text-sm text-gray-600">{userData.businessName}</p>
      </header>

      {/* Sidebar */}
      <Sidebar />

      <div>{children}</div>
    </div>
  );
}
