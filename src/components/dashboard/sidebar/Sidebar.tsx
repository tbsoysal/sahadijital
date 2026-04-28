"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FieldMenu } from "./FieldMenu";
import { ViewMenu } from "./ViewMenu";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";
import { useDashboardContext } from "@/context/DashboardContext";
import { usePushNotifications } from "@/lib/hooks/dashboard/usePushNotifications";
import { Bell, BellOff, BellRing } from "lucide-react";

export default function Sidebar() {
  const { isSidebarOpen } = useDashboardContext();
  const { isSupported, isSubscribed, isLoading, permission, subscribe } =
    usePushNotifications();
  return (
    <aside
      className={cn(
        // Mobile: fixed overlay, toggled via isSidebarOpen
        "fixed top-0 left-0 z-50 h-full w-64 shrink-0 bg-white shadow-lg transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        // md+: always visible, part of normal flow
        "md:relative md:translate-x-0 md:shadow-none",
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
            {isSupported && (
              <li>
                {isSubscribed ? (
                  <div className="flex items-center gap-3 rounded-md px-3 py-2 text-green-600">
                    <BellRing className="h-5 w-5 shrink-0" />
                    <span className="text-base font-medium">Bildirimler Aktif</span>
                  </div>
                ) : permission === "denied" ? (
                  <div className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-400">
                    <BellOff className="h-5 w-5 shrink-0" />
                    <span className="text-base font-medium">Bildirimler Engellendi</span>
                  </div>
                ) : (
                  <button
                    onClick={subscribe}
                    disabled={isLoading}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Bell className="h-5 w-5 shrink-0" />
                    <span className="text-base font-medium">
                      {isLoading ? "Etkinleştiriliyor..." : "Bildirimleri Etkinleştir"}
                    </span>
                  </button>
                )}
              </li>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        <LogoutButton />
      </div>
    </aside>
  );
}
