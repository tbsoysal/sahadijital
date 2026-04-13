import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 bg-white px-6 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/images/sahadijital-logo.svg"
            alt="SahaDijital Logo"
            width={24}
            height={24}
          />
          <span className="text-sm font-bold text-gray-900">Admin Panel</span>
        </Link>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
