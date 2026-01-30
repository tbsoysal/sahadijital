"use client";

import { Check, X, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";

type Variant = "success" | "error" | "warning";

type NotificationModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: Variant;
  actionText?: string;
  onAction?: () => void;
};

const icons = {
  success: <Check className="h-6 w-6 text-green-600" />,
  error: <X className="h-6 w-6 text-red-600" />,
  warning: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
};

const colors = {
  success: "bg-green-100",
  error: "bg-red-100",
  warning: "bg-yellow-100",
};

export function NotificationModal({
  open,
  onClose,
  title,
  message,
  variant = "success",
  actionText = "Tamam",
  onAction,
}: NotificationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div
          className={clsx(
            "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
            colors[variant],
          )}
        >
          {icons[variant]}
        </div>

        <h3 className="text-center text-2xl font-medium">{title}</h3>
        <p className="text-secondary-color mt-2 text-center text-base font-medium">
          {message}
        </p>

        <Button
          onClick={() => {
            onAction?.();
            onClose();
          }}
          className="mt-6 w-full"
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
}
