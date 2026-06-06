"use client";

import React, { useState } from "react";
import { IGetAllPatientAppointments } from "../../../services/appointment.service";
import { useGetAllPatientsQuery } from "./useGetAllPatientsQuery";
import { ColumnType } from "@/src/components/TableComponent";
import { APPOINTMENT_STATUS } from "@/src/types/appointment.types";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const LIMIT = 5;
export const usePatientAppointment = () => {
  const [statusFilter, setStatusFilter] = useState<
    APPOINTMENT_STATUS | undefined
  >(undefined);
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { data } = useGetAllPatientsQuery({
    page,
    limit: LIMIT,
    status: statusFilter,
  });

  const totalPages = Math.ceil((data?.data.totalCount ?? 0) / LIMIT);
  console.log("tp", totalPages, LIMIT, data?.data.totalCount);

  const appointmentsWithActionRequired = data?.data.appointments.filter(
    (a) =>
      a.appointment.status === APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED,
  )??[];
  console.log(appointmentsWithActionRequired,12, APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED);
  const column: ColumnType<IGetAllPatientAppointments["appointments"][0]> = [
    {
      key: "id",
      title: "Sl",
      render: (_v, _r, _d, i) => i + 1,
    },

    {
      key: "doctor",
      title: "Doctor",
      render: (_v, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
            {row.doctor.profilePicture ? (
              <img
                src={row.doctor.profilePicture}
                alt={row.doctor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-700">
                {row.doctor.name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <p className="font-medium text-slate-900">{row.doctor.name}</p>

            <p className="text-xs text-slate-500">
              {row.doctor.specialization}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "appointment",
      title: "Date & Time",
      render: (_v, row) => (
        <div>
          <p className="text-sm font-medium text-slate-800">
            {new Date(row.appointment.startTime).toLocaleDateString()}
          </p>

          <p className="text-xs text-slate-500">
            {new Date(row.appointment.startTime).toLocaleTimeString()}
          </p>
        </div>
      ),
    },

    {
      key: "consultationType",
      title: "Type",
      render: (_v, row) => (
        <span className="text-sm text-slate-700">
          {row.appointment.consultationType}
        </span>
      ),
    },

    {
      key: "paymentStatus",
      title: "Payment",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-800">
            ₹{row.appointment.totalAmount}
          </span>

          <span className="text-xs text-slate-500">
            {row.appointment.paymentStatus}
          </span>
        </div>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (_v, row) => {
        const status = row.appointment.status;

        const styles = {
          [APPOINTMENT_STATUS.CONFIRMED]: "bg-blue-100 text-blue-700",

          [APPOINTMENT_STATUS.ONGOING]: "bg-green-100 text-green-700",

          [APPOINTMENT_STATUS.COMPLETED]: "bg-emerald-100 text-emerald-700",

          [APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED]:
            "bg-amber-100 text-amber-700",

          [APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR]: "bg-red-100 text-red-700",

          [APPOINTMENT_STATUS.CANCELLED_BY_PATIENT]: "bg-red-100 text-red-700",

          [APPOINTMENT_STATUS.NO_SHOW]: "bg-slate-200 text-slate-700",

          [APPOINTMENT_STATUS.EXPIRED]: "bg-slate-200 text-slate-700",
        };

        const label =
          status === APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED
            ? "Action Required"
            : status.replaceAll("_", " ");

        return (
          <div className="flex flex-col">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status]
              }`}
            >
              {label}
            </span>

            {status === APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED && (
              <span className="mt-1 text-xs text-amber-600">
                Choose refund or reschedule
              </span>
            )}
          </div>
        );
      },
    },
    // {
    //   key: "consultation",
    //   title: "Consultation",
    //   render: (_v, row) => (
    //     <div className="flex flex-col gap-1">
    //       <span className="text-xs text-slate-700">
    //         {row.consultation.exists
    //           ? row.consultation.completed
    //             ? "Completed"
    //             : "Ongoing"
    //           : "Not Started"}
    //       </span>

    //       {/* {row.hasLabReports && (
    //         <span className="inline-flex items-center gap-1 text-xs text-blue-600">
    //           <FileText className="w-3 h-3" />
    //           Lab Reports
    //         </span>
    //       )} */}
    //     </div>
    //   ),
    // },

    {
      key: "actions",
      title: "Actions",
      render: (_v, row) => (
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            title="View Appointment"
            onClick={() => router.push("/dashboard/appointment/" + row.id)}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return {
    appointment: data?.data.appointments ?? [],
    column,
    currentPage: page,
    statusFilter,
    setStatusFilter,
    setPage,
    totalPages,
    appointmentsWithActionRequired,
  };
};
