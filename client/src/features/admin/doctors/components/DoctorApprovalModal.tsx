import Input from "@/src/components/ui/Input";
import { ModalProps } from "@/src/layout/ModalProvider";
import { DOCTOR_STATUS } from "@/src/types/user.types";
import { Info } from "lucide-react";
import React, { useState } from "react";

interface DoctorApprovalModalProps extends ModalProps {
  title: string;
  status: DOCTOR_STATUS;
  onConfirm: (reason?: string) => void;
}

const DoctorApprovalModal = ({
  title,
  status,
  onConfirm,
  close,
}: DoctorApprovalModalProps) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleConfirm = () => {
    if (rejectionReason.length < 3 && status === DOCTOR_STATUS.REJECTED) {
      setError("Rejection Reason is not valid");
      return;
    }
    setError(null);
    onConfirm(rejectionReason);
    close();
  };
  return (
    <div className="p-6 w-full max-w-sm">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-yellow-600 mb-4 ${"bg-yellow-100"}`}
      >
        <Info />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 text-center mb-1">
        {title}
      </h2>

      {/* Message */}
      <p className="text-sm text-slate-500 text-center mb-6">
        Are you sure you want to {status} doctor ?{" "}
      </p>
      {status === DOCTOR_STATUS.REJECTED && (
        <>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Rejection Reason
          </label>
          <Input
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            type="text"
            placeholder="Rejected Because..."
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      )}
      {/* Actions */}
      <div className="flex gap-3 my-2">
        <button
          onClick={close}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${"bg-yellow-500 hover:bg-yellow-600"}`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DoctorApprovalModal;
