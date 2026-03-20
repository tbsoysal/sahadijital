"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FieldMenu } from "./FieldMenu";
import { ViewMenu } from "./ViewMenu";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";
import { useDashboardContext } from "@/context/DashboardContext";

export default function Sidebar() {
  const { isSidebarOpen } = useDashboardContext();
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2 px-2">
            <Image
              src="/images/sahadijital-logo.svg"
              alt="Logo"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-primary text-xl font-bold">Saha Dijital</span>
          </div>

          {/* Views List */}
          <ViewMenu />

          {/* Fields List */}
          <FieldMenu />

          {/* Navigation Links */}
          <ul className="py-4">
            <MenuItem
              label="İstatistikler"
              destination="/dashboard/statics"
              icon="/images/staticsMenuIcon.svg"
            />
            <MenuItem
              label="Ayarlar"
              destination="/dashboard/settings"
              icon="/images/settingsMenuIcon.svg"
            />
          </ul>
        </div>
        {/* Logout Button */}
        <LogoutButton />
      </div>
    </aside>
  );
}
