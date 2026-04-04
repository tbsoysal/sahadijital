"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X, Plus } from "lucide-react";
import SettingsCard from "./SettingsCard";
import Button from "@/components/Button";
import { NotificationModal } from "@/components/NotificationModal";
import { useDashboardContext } from "@/context/DashboardContext";
import { calendarService } from "@/lib/services/calendarService";

export default function FieldsSection() {
  const { fields, setFields, userData, selectedField, setSelectedField } =
    useDashboardContext();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingPrice, setEditingPrice] = useState<string>("");
  const [newFieldName, setNewFieldName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });

  const handleRenameStart = (field: {
    id: string;
    name: string;
    default_price: number;
  }) => {
    setEditingId(field.id);
    setEditingName(field.name);
    setEditingPrice(String(field.default_price));
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleRenameSave = async (fieldId: string) => {
    try {
      await calendarService.renameField(fieldId, editingName.trim());
      const price = Number(editingPrice) || 0;
      await calendarService.updateFieldPrice(fieldId, price);
      const updated = { name: editingName.trim(), default_price: price };
      setFields((prev) =>
        prev?.map((f) => (f.id === fieldId ? { ...f, ...updated } : f)),
      );
      if (selectedField?.id === fieldId) {
        setSelectedField({ ...selectedField, ...updated });
      }
      setEditingId(null);
    } catch (error) {
      setErrorModal({
        open: true,
        message: error instanceof Error ? error.message : "Bir hata oluştu.",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await calendarService.deleteField(deleteTarget.id);
      setFields((prev) => prev?.filter((f) => f.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      setDeleteTarget(null);
      setErrorModal({
        open: true,
        message: error instanceof Error ? error.message : "Bir hata oluştu.",
      });
    }
  };

  const handleAdd = async () => {
    if (!newFieldName.trim()) return;
    try {
      const newField = await calendarService.addField(
        userData.id,
        newFieldName.trim(),
      );
      setFields((prev) => [...(prev ?? []), newField]);
      setNewFieldName("");
    } catch (error) {
      setErrorModal({
        open: true,
        message: error instanceof Error ? error.message : "Bir hata oluştu.",
      });
    }
  };

  return (
    <>
      <SettingsCard title="Saha Yönetimi">
        <p className="mb-4 text-sm text-gray-500">
          Tesisinizdeki sahaları, saha adlarını ve varsayılan rezervasyon
          ücretlerini buradan yönetebilirsiniz.
        </p>
        <div className="flex flex-col gap-3">
          {/* Field List */}
          {fields && fields.length > 0 ? (
            fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
              >
                {editingId === field.id ? (
                  <>
                    <div className="flex min-w-0 flex-1 gap-2">
                      <input
                        className="min-w-0 flex-1 rounded-md border border-[#A4A7AE] bg-white px-3 py-1.5 text-base font-medium focus:outline-none"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        autoFocus
                      />
                      <input
                        type="number"
                        className="w-20 shrink-0 rounded-md border border-[#A4A7AE] bg-white px-3 py-1.5 text-base font-medium focus:outline-none"
                        value={editingPrice}
                        onChange={(e) => setEditingPrice(e.target.value)}
                        placeholder="₺ Fiyat"
                      />
                    </div>
                    <button
                      onClick={() => handleRenameSave(field.id)}
                      className="cursor-pointer rounded-md p-1.5 text-green-600 hover:bg-green-50"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleRenameCancel}
                      className="cursor-pointer rounded-md p-1.5 text-gray-400 hover:bg-gray-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-base font-medium text-[#181D27]">
                      {field.name}
                    </span>
                    <span className="text-sm font-medium text-[#12B76A]">
                      ₺{field.default_price}
                    </span>
                    <button
                      onClick={() => handleRenameStart(field)}
                      className="cursor-pointer rounded-md p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({ id: field.id, name: field.name })
                      }
                      disabled={fields.length === 1 ? true : false}
                      className="cursor-pointer rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:hidden"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">Henüz saha eklenmemiş.</p>
          )}

          {/* Add New Field */}
          <div className="mt-2 flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-lg border border-[#A4A7AE] bg-white px-3.5 py-3 text-base font-medium focus:outline-none"
              placeholder="Yeni saha adı"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Button
              onClick={handleAdd}
              disabled={!newFieldName.trim()}
              className="shrink-0 gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Ekle
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-center text-2xl font-medium">Sahayı Sil</h3>
            <p className="mt-2 text-center text-base font-medium text-gray-500">
              <span className="font-semibold text-[#181D27]">
                {deleteTarget.name}
              </span>{" "}
              sahası silinecek. Bu işlem geri alınamaz.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setDeleteTarget(null)}
              >
                Vazgeç
              </Button>
              <Button
                className="flex-1 bg-red-500! text-white! active:bg-red-700!"
                onClick={handleDeleteConfirm}
              >
                Sil
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      <NotificationModal
        open={errorModal.open}
        variant="error"
        title="Hata"
        message={errorModal.message}
        onAction={() => setErrorModal({ open: false, message: "" })}
      />
    </>
  );
}
