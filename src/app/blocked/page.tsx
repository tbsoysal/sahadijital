"use client";

import { authService } from "@/lib/services/authService";
import { useRouter } from "next/navigation";

export default function BlockedPage() {
  const router = useRouter();

  async function handleSignOut() {
    await authService.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F5] px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">
          Hesabınız Askıya Alındı
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Hesabınıza erişim geçici olarak kısıtlandı. Lütfen bizimle iletişime
          geçin.
        </p>
        <button
          onClick={handleSignOut}
          className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
