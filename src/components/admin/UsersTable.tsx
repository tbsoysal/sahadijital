"use client";

import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import type { AdminUser } from "@/lib/services/adminService";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return format(new Date(dateStr), "d MMM yyyy, HH:mm", { locale: tr });
}

export default function UsersTable({
  initialUsers,
}: {
  initialUsers: AdminUser[];
}) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function toggleBlock(user: AdminUser) {
    setLoadingId(user.id);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !user.is_blocked }),
      });
      if (!res.ok) throw new Error("Failed");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_blocked: !u.is_blocked } : u,
        ),
      );
    } catch {
      alert("İşlem başarısız oldu.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Kullanıcı</th>
              <th className="px-4 py-3">E-posta</th>
              <th className="px-4 py-3">Kayıt Tarihi</th>
              <th className="px-4 py-3">Son Giriş</th>
              <th className="px-4 py-3">Kalan Süre</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {user.full_name ?? "—"}
                  </div>
                  {user.business_name && (
                    <div className="text-xs text-gray-400">
                      {user.business_name}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {formatDate(user.last_sign_in_at)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {user.days_remaining > 0 ? (
                    <span className="font-medium text-gray-800">
                      {user.days_remaining} gün
                    </span>
                  ) : (
                    <span className="font-medium text-red-500">Süresi doldu</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {user.is_blocked ? (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                      Engelli
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                      Aktif
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleBlock(user)}
                    disabled={loadingId === user.id}
                    className={`rounded px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                      user.is_blocked
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {loadingId === user.id
                      ? "..."
                      : user.is_blocked
                        ? "Engeli Kaldır"
                        : "Engelle"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            Henüz kullanıcı yok.
          </div>
        )}
      </div>
    </div>
  );
}
