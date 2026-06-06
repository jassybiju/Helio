"use client";

import { ModalProps } from "@/src/layout/ModalProvider";

interface ConfirmModalProps extends ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

export function ConfirmModal({
  close,
  title,
  message,
  onConfirm,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <div className="p-6 w-full max-w-sm">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${"bg-red-100"}`}
      >
        {/* {isBlocking ? (
          <Lock className="w-6 h-6 text-red-600" />
        ) : (
          <Unlock className="w-6 h-6 text-green-600" />
        )} */}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 text-center mb-1">
        {title}
      </h2>

      {/* Message */}
      <p className="text-sm text-slate-500 text-center mb-6">{message}</p>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={close}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${"bg-red-500 hover:bg-red-600"}`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
