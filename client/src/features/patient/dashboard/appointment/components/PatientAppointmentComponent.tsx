"use client";

import Pagination from "@/src/components/Pagination";
import TableComponent from "@/src/components/TableComponent";
import React from "react";
import { usePatientAppointment } from "../hooks/usePatientAppointment";
import { APPOINTMENT_STATUS } from "@/src/types/appointment.types";
import { useRouter } from "next/dist/client/components/navigation";

const PatientAppointmentComponent = () => {
  const {
    appointment,
    column,
    currentPage,
    statusFilter,
    setStatusFilter,
    totalPages,
    setPage,
    appointmentsWithActionRequired,
  } = usePatientAppointment();
  const router = useRouter();

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 space-y-4">
        {" "}
        {/* Search Bar */}
        {appointmentsWithActionRequired && appointmentsWithActionRequired?.length > 0 && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-900">
              Doctor Requested Cancellation
            </h3>

            <p className="mt-1 text-sm text-amber-700">
              One or more appointments require your action.
            </p>
            <button
              className="mt-3 w-full sm:w-auto rounded-md bg-amber-600 px-4 py-2 text-white"
              onClick={() =>
                router.push(
                  `/dashboard/appointment/${appointmentsWithActionRequired[0]}`,
                )
              }
            >
              Review Request
            </button>
          </div>
        )}
        {/* Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="text-sm font-semibold text-slate-600 uppercase">
            Filters
          </span>

          <select
            value={statusFilter ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                return setStatusFilter(undefined);
              }

              setStatusFilter(e.target.value as APPOINTMENT_STATUS);
              setPage(1);
            }}
            className="w-full sm:w-56 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={""}>All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No-Show</option>
          </select>

          <button
            onClick={() => {
              setStatusFilter(undefined);
              setPage(1);
            }}
            className="w-full sm:w-auto px-4 py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <TableComponent columns={column} data={appointment} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>

        {appointment.length === 0 && (
          <div className="py-8 sm:py-12 text-center">
            {" "}
            <p className="text-slate-600">No appointments found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientAppointmentComponent;
