"use client";

import { Check, X, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";

type Variant = "success" | "error" | "warning";

type NotificationModalProps = {
  open: boolean;
  title: string;
  message: string;
  variant?: Variant;
  actionText?: string;
  onAction?: () => void;
  cancelText?: string;
  onCancel?: () => void;
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
  title,
  message,
  variant = "success",
  actionText = "Tamam",
  onAction,
  cancelText = "İptal",
  onCancel,
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

        <div className={clsx("mt-6 flex gap-3", onCancel ? "flex-row" : "flex-col")}>
          {onCancel && (
            <Button variant="secondary" onClick={onCancel} className="flex-1">
              {cancelText}
            </Button>
          )}
          <Button
            onClick={() => {
              onAction?.();
            }}
            className={onCancel ? "flex-1" : "w-full"}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
}
