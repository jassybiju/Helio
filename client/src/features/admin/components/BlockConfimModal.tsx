"use client";

import { useModal } from "@/src/hooks/useModal";
import { ModalProps } from "@/src/layout/ModalProvider";
import { Lock, Unlock } from "lucide-react";

interface BlockConfirmModalProps extends ModalProps {
  patientName: string;
  currentStatus: "active" | "blocked";
  onConfirm: () => void;
}

export function BlockConfirmModal({
  close,
  patientName,
  currentStatus,
  onConfirm,
}: BlockConfirmModalProps) {
  const { open } = useModal();
  const isBlocking = currentStatus === "active";

  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <div className="p-6 w-full max-w-sm">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isBlocking ? "bg-red-100" : "bg-green-100"
        }`}
      >
        {isBlocking ? (
          <Lock className="w-6 h-6 text-red-600" />
        ) : (
          <Unlock className="w-6 h-6 text-green-600" />
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 text-center mb-1">
        {isBlocking ? "Block Patient" : "Unblock Patient"}
      </h2>

      {/* Message */}
      <p className="text-sm text-slate-500 text-center mb-6">
        Are you sure you want to {isBlocking ? "block" : "unblock"}{" "}
        <span className="font-medium text-slate-700">{patientName}</span>?{" "}
        {isBlocking
          ? "They will lose access to the platform."
          : "They will regain access to the platform."}
      </p>

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
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
            isBlocking
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isBlocking ? "Yes, Block" : "Yes, Unblock"}
        </button>
      </div>

      {/* Test button — open same modal nested */}
      <button
        onClick={() =>
          open(BlockConfirmModal, {
            patientName,
            currentStatus,
            onConfirm,
          })
        }
        className="mt-3 w-full px-4 py-2 rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 hover:bg-slate-50 transition-colors"
      >
        🧪 Open nested modal (test)
      </button>
    </div>
  );
}
