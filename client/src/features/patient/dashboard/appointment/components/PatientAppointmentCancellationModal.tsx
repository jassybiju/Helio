"use client";

import { useModal } from "@/src/hooks/useModal";
import { ModalProps } from "@/src/layout/ModalProvider";
import { AlertTriangle, Check, X } from "lucide-react";
import React, { useState } from "react";
import PatientAppointmentRescheduleModal from "./PatientAppointmentRescheduleModal";
import { toast } from "react-toastify";
import { useCancelPatientAppointmentMutation } from "../hooks/useCancelPatientAppointment";
import { useReschedulePatientAppointmentMutation } from "../hooks/useReschedulePatientAppointmentMutation";

const PatientAppointmentCancellationModal = ({
  close,
  date,
  fee,
  appointmentId,
}: ModalProps & { date: Date; fee: number; appointmentId: string }) => {
  const [cancellationAction, setCancellationAction] = useState("");
  const { mutate: cancelAppointment } =
    useCancelPatientAppointmentMutation(appointmentId);
  const { mutate: rescheduleAppointment } =
    useReschedulePatientAppointmentMutation(appointmentId);
  const { open } = useModal();
  const appointment = {};
  const openRescheduleModal = () => {
    open(PatientAppointmentRescheduleModal, {
      appointmentId: appointmentId,
      rescheduleAppointment,
    });
  };
  return (
    <div className=" inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full  max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200 p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900">
              Appointment Cancellation
            </h2>
            <p className="text-slate-600 mt-1">
              Are you sure you want to cancel appointment
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Cancellation Reason */}
          {/* <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Reason for Cancellation</h3>
                <p className="text-slate-700">{appointment.cancellationReason}</p>
              </div> */}

          {/* Appointment Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">
              Original Appointment
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-blue-700 uppercase font-semibold mb-1">
                  Date
                </p>
                <p className="text-sm font-bold text-blue-900">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-700 uppercase font-semibold mb-1">
                  Time
                </p>
                <p className="text-sm font-bold text-blue-900">
                  {new Date(date).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-700 uppercase font-semibold mb-1">
                  Fee
                </p>
                <p className="text-sm font-bold text-blue-900">${fee}</p>
              </div>
            </div>
          </div>

          {/* Action Selection */}
          <div className="space-y-3">
            <p className="font-semibold text-slate-900">
              What would you like to do?
            </p>

            {/* Reschedule Option */}
            <div
              onClick={() => setCancellationAction("reschedule")}
              className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                cancellationAction === "reschedule"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition ${
                    cancellationAction === "reschedule"
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300"
                  }`}
                >
                  {cancellationAction === "reschedule" && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">
                    Reschedule Appointment
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Book a new appointment at no extra cost with{" "}
                    . You have 7 days to reschedule.
                  </p>
                </div>
              </div>
            </div>

            {/* Refund Option */}
            <div
              onClick={() => setCancellationAction("refund")}
              className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                cancellationAction === "refund"
                  ? "border-green-600 bg-green-50"
                  : "border-slate-200 hover:border-green-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition ${
                    cancellationAction === "refund"
                      ? "border-green-600 bg-green-600"
                      : "border-slate-300"
                  }`}
                >
                  {cancellationAction === "refund" && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Accept Refund</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Receive a full refund of ${fee} to your original
                    payment method within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Important:</span> If you choose to
              reschedule, you must book within 7 days to avoid forfeiting this
              appointment slot.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-6 flex gap-3 justify-end">
          <button
            onClick={close}
            className="px-6 py-3 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => {
              if (cancellationAction === "reschedule") {
                openRescheduleModal();
              } else if (cancellationAction === "refund") {
                cancelAppointment(undefined, {
                  onSuccess() {
                    toast.success("Cacnelled Succesffuly");
                    close();
                  },
                });
              }
            }}
            disabled={!cancellationAction}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentCancellationModal;
