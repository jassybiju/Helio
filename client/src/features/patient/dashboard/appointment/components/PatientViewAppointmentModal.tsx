"use client";

import {
  CalendarDays,
  ClipboardList,
  Download,
  Printer,
  Stethoscope,
  Wallet,
  X,
} from "lucide-react";
import React from "react";
import { ModalProps } from "@/src/layout/ModalProvider";
import { useGetPatientsAppointmentQuery } from "../hooks/useGetPatientsAppointmentQuery";

const PatientViewAppointmentModal = ({
  id,
  close,
}: ModalProps & { id: string }) => {
  const { data } = useGetPatientsAppointmentQuery(id);

  const appointment = data?.data;

  if (!appointment) return null;

  return (
      <div className="w-full  overflow-y-auto rounded-[34px] bg-[#FCFCFD] shadow-[0_10px_50px_rgba(0,0,0,0.15)] border border-[#E9EDF5]">
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-[#FCFCFD] rounded-t-[34px] border-b border-[#EEF2F6] px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                <ClipboardList className="text-[#2563EB]" size={22} />
              </div>

              <div>
                <h2 className="text-[30px] font-bold text-[#101828]">
                  Appointment Details
                </h2>

                <p className="text-sm text-[#667085] mt-1">
                  Appointment ID: {appointment.appointmentId}
                </p>
              </div>
            </div>

            <button
              onClick={close}
              className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* DOCTOR */}
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <img
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              /> */}

              <div>
                <h3 className="text-2xl font-semibold text-[#101828]">
                  Dr. {appointment.doctor.name}
                </h3>

                <p className="text-[#2563EB] font-medium text-sm mt-1">
                  {appointment.doctor.specialization || "General Physician"}
                </p>

                <div className="mt-2 flex items-center gap-2 text-[#667085] text-sm">
                  <CalendarDays size={15} />
                  {new Date(
                    appointment.appointment.startTime
                  ).toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <span className="rounded-full bg-[#EEF4FF] text-[#2563EB] px-5 py-2 text-sm font-semibold">
                {appointment.appointment.status}
              </span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-8 py-7 space-y-8">
          {/* APPOINTMENT INFO */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Stethoscope className="text-[#2563EB]" size={22} />

              <h3 className="text-2xl font-semibold text-[#101828]">
                Appointment Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoCard
                label="Consultation Type"
                value={appointment.appointment.consultationType}
              />

              <InfoCard
                label="Start Time"
                value={new Date(
                  appointment.appointment.startTime
                ).toLocaleString()}
              />

              <InfoCard
                label="End Time"
                value={new Date(
                  appointment.appointment.endTime
                ).toLocaleString()}
              />

              <InfoCard
                label="Booking Date"
                value={new Date(appointment.createdAt).toLocaleString()}
              />
            </div>
          </section>

          {/* PAYMENT */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Wallet className="text-[#2563EB]" size={22} />

              <h3 className="text-2xl font-semibold text-[#101828]">
                Payment Details
              </h3>
            </div>

            <div className="rounded-[28px] border border-[#EEF2F6] overflow-hidden">
              <PaymentRow
                label="Consultation Fee"
                value={`₹${appointment.appointment.consultationFee}`}
              />

              <PaymentRow
                label="Platform Fee"
                value={`₹${appointment.appointment.platformFee}`}
              />

              <PaymentRow
                label="Total Amount"
                value={`₹${appointment.appointment.totalAmount}`}
                bold
              />

              <PaymentRow
                label="Payment Status"
                value={appointment.payment.paymentStatus}
              />

              {appointment.payment.paymentId && (
                <PaymentRow
                  label="Payment ID"
                  value={appointment.payment.paymentId}
                />
              )}
            </div>
          </section>

          {/* CANCELLATION */}
          {appointment.cancellationReason && (
            <section>
              <div className="rounded-[28px] border border-red-200 bg-red-50 p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Cancellation Reason
                </h3>

                <p className="text-red-600">
                  {appointment.cancellationReason}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-[#FCFCFD] border-t border-[#EEF2F6] px-8 py-5 rounded-b-[34px]">
          <div className="flex items-center justify-end gap-4">
            <button className="rounded-full border border-[#D0D5DD] px-6 py-3 font-medium hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Printer size={18} />
                Print Summary
              </div>
            </button>

            <button className="rounded-full bg-[#2563EB] text-white px-7 py-3 font-medium shadow-lg hover:opacity-90">
              <div className="flex items-center gap-2">
                <Download size={18} />
                Download Invoice
              </div>
            </button>
          </div>
        </div>
      </div>
  );
};

export default PatientViewAppointmentModal;

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] bg-white border border-[#EEF2F6] p-5 shadow-sm">
      <div className="text-sm font-medium text-[#667085]">{label}</div>

      <div className="mt-2 text-lg font-semibold text-[#101828]">
        {value}
      </div>
    </div>
  );
}

function PaymentRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-5 px-6 py-5 border-b border-[#EEF2F6] last:border-none">
      <div className="font-medium text-[#667085]">{label}</div>

      <div
        className={`text-[#101828] ${
          bold ? "font-bold text-lg" : "font-medium"
        }`}
      >
        {value}
      </div>
    </div>
  );
}