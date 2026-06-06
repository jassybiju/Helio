"use client";

import { Search,  } from "lucide-react";
import TableComponent from "@/src/components/TableComponent";
import Pagination from "@/src/components/Pagination";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";
import useDoctorAppointment from "../hooks/useDoctorAppointment";


// type CONSULTATION_TYPE = "all" | "online" | "in-person";
const DoctorAppointmentComponent = () => {
  const {
    searchQuery,
    setSearchQuery,
    setPage,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    column,
    appointments,
    totalPages,
    page,
  } = useDoctorAppointment();

  if (!appointments) {
    return null;
  }
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
            <option value={""}>All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No-Show</option>
          </select>

          <select
            value={typeFilter ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                return setTypeFilter(undefined);
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
