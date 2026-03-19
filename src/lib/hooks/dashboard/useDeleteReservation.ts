import { calendarService } from "@/lib/services/calendarService";
import { useState } from "react";

export function useDeleteReservation(onSuccess: (id: string) => void) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteReservation = async (id: string) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await calendarService.deleteReservation(id);
      onSuccess(id);
    } catch (err) {
      setDeleteError(
        err instanceof Error
          ? err.message
          : (err as { message?: string }).message ?? "Bir hata oluştu.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteReservation, isDeleting, deleteError, clearDeleteError: () => setDeleteError(null) };
}
