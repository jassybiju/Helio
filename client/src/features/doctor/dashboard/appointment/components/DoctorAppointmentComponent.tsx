"use client";

import { useState, useMemo } from "react";
import { Search, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import TableComponent, { ColumnType } from "@/src/components/TableComponent";
import Pagination from "@/src/components/Pagination";
import { useGetDoctorAppointmentsQuery } from "../hooks/useGetDoctorAppointmentsQuery";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";
import { APPOINTMENT_LIST } from "../../../services/appointment.service";

const LIMIT = 5;

// type CONSULTATION_TYPE = "all" | "online" | "in-person";
const DoctorAppointmentComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    APPOINTMENT_STATUS | undefined
  >(undefined);
  const [typeFilter, setTypeFilter] = useState<CONSULTATION_TYPE | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const { data } = useGetDoctorAppointmentsQuery({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    date : dateFilter,
    page: page,
    limit: LIMIT,
  });

  const appointments = data?.data.data;
  const totalCount = data?.data.pagination.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT);
  
  
  const getTimeOfDay = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-slate-100 text-slate-700";
      case "no-show":
        return "bg-red-100 text-red-700";
      case "ongoing":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === "paid" ? "text-green-600" : "text-orange-600";
  };

  const getPaymentStatusIcon = (status: string) => {
    return status === "paid" ? "✓" : "○";
  };

  const canCancelAppointment = (status: string) => {
    return status === "booked" || status === "ongoing";
  };

  if (!appointments) {
    return null;
  }

  const column: ColumnType<APPOINTMENT_LIST> = [
    { key: "id", title: "Sl", render: (_v, _r, _d, i) => i + 1 },
    { key: "time", title: "Date & Time", render: (v) => new Date(v).toLocaleString('en-US',) },
    {
      key: "name",
      title: "Patient Name",
      render: (_v, r) => (
        <div className="flex items-center gap-3">
          {/* <div
            className={`w-10 h-10 rounded-full ${r.patientColor} flex items-center justify-center text-white font-semibold text-sm`}
          >
            {r.patientInitials}
          </div> */}
          <span className="font-medium text-slate-900">{r.patientName}</span>
        </div>
      ),
    },
    {
      key: "type",
      title: "Appointment Type",
      render: (v, ) => (
        <div className="flex items-center gap-2">
          {v === "ONLINE" ? (
            <>
              <span className="text-blue-600">📱</span>
              <span className="text-sm text-slate-600">Online</span>
            </>
          ) : (
            <>
              <span className="text-slate-600">👤</span>
              <span className="text-sm text-slate-600">In-Person</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "Payment",
      title: "Payment",
      render: (_v, r) => (
        <div
          className={`flex items-center gap-2 font-medium ${getPaymentStatusColor(r.paymentStatus)}`}
        >
          <span>{getPaymentStatusIcon(r.paymentStatus)}</span>
          <span className="text-sm capitalize">{r.paymentStatus}</span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (v, r) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(r.status)}`}
        >
          {r.status === "no-show"
            ? "No-Show"
            : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        </span>
      ),
    },
    {
      key: "status",
      title: "Actions",
      render: (v, r) => (
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {canCancelAppointment(r.status) && (
            <button
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Cancel appointment"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-slate-600 uppercase">
            Filters
          </span>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                return setStatusFilter(undefined);
              }

              setStatusFilter(e.target.value as APPOINTMENT_STATUS);
              setPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={''}>All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No-Show</option>
          </select>

          <select
            value={typeFilter ?? ''}
            onChange={(e) => {
              if(e.target.value === ''){
                return setTypeFilter(undefined)
              }
              setTypeFilter(e.target.value as CONSULTATION_TYPE);
              setPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="ONLINE">Online</option>
            <option value="CLINIC">In-Person</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter(undefined);
              setTypeFilter(undefined);
              setDateFilter("");
              setPage(1);
            }}
            className="px-4 py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <TableComponent columns={column} data={appointments} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No appointments found</p>
          </div>
        )}

        {/* Pagination */}
        {/* {appointments.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Show</span>
              <span className="font-semibold text-slate-900">
                {ITEMS_PER_PAGE} per page
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setpage(page)}
                      className={`w-8 h-8 rounded-lg font-semibold text-sm transition ${
                        page === page
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default DoctorAppointmentComponent;
