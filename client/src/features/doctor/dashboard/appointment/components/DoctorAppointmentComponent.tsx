"use client";

import { useState, useMemo } from "react";
import { Search, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import TableComponent, { ColumnType } from "@/src/components/TableComponent";
import Pagination from "@/src/components/Pagination";

const mockAppointments: object[] = [
  {
    id: "1",
    time: "9:00 AM",
    patientName: "Michael Chen",
    patientInitials: "MC",
    patientColor: "bg-blue-500",
    consultationType: "online",
    paymentStatus: "paid",
    appointmentStatus: "booked",
    date: "2024-03-15",
  },
  {
    id: "2",
    time: "9:30 AM",
    patientName: "Sarah Adams",
    patientInitials: "SA",
    patientColor: "bg-purple-500",
    consultationType: "in-person",
    paymentStatus: "paid",
    appointmentStatus: "completed",
    date: "2024-03-15",
  },
  {
    id: "3",
    time: "12:00 AM",
    patientName: "David Ross",
    patientInitials: "DR",
    patientColor: "bg-orange-500",
    consultationType: "in-person",
    paymentStatus: "pending",
    appointmentStatus: "no-show",
    date: "2024-03-15",
  },
  {
    id: "4",
    time: "1:00 PM",
    patientName: "Emily Moore",
    patientInitials: "EM",
    patientColor: "bg-pink-500",
    consultationType: "online",
    paymentStatus: "paid",
    appointmentStatus: "cancelled",
    date: "2024-03-15",
  },
  {
    id: "5",
    time: "2:00 PM",
    patientName: "John Wilson",
    patientInitials: "JW",
    patientColor: "bg-green-500",
    consultationType: "in-person",
    paymentStatus: "paid",
    appointmentStatus: "booked",
    date: "2024-03-15",
  },
  {
    id: "6",
    time: "3:00 PM",
    patientName: "Lisa Johnson",
    patientInitials: "LJ",
    patientColor: "bg-red-500",
    consultationType: "online",
    paymentStatus: "paid",
    appointmentStatus: "ongoing",
    date: "2024-03-15",
  },
  {
    id: "7",
    time: "3:30 PM",
    patientName: "James Brown",
    patientInitials: "JB",
    patientColor: "bg-indigo-500",
    consultationType: "in-person",
    paymentStatus: "pending",
    appointmentStatus: "booked",
    date: "2024-03-15",
  },
  {
    id: "8",
    time: "4:00 PM",
    patientName: "Maria Garcia",
    patientInitials: "MG",
    patientColor: "bg-teal-500",
    consultationType: "online",
    paymentStatus: "paid",
    appointmentStatus: "completed",
    date: "2024-03-15",
  },
  {
    id: "9",
    time: "4:30 PM",
    patientName: "Robert Taylor",
    patientInitials: "RT",
    patientColor: "bg-cyan-500",
    consultationType: "in-person",
    paymentStatus: "paid",
    appointmentStatus: "booked",
    date: "2024-03-15",
  },
  {
    id: "10",
    time: "5:00 PM",
    patientName: "Amanda White",
    patientInitials: "AW",
    patientColor: "bg-amber-500",
    consultationType: "online",
    paymentStatus: "pending",
    appointmentStatus: "cancelled",
    date: "2024-03-15",
  },
  {
    id: "11",
    time: "5:30 PM",
    patientName: "Christopher Lee",
    patientInitials: "CL",
    patientColor: "bg-lime-500",
    consultationType: "in-person",
    paymentStatus: "paid",
    appointmentStatus: "no-show",
    date: "2024-03-15",
  },
  {
    id: "12",
    time: "6:00 PM",
    patientName: "Jessica Martinez",
    patientInitials: "JM",
    patientColor: "bg-rose-500",
    consultationType: "online",
    paymentStatus: "paid",
    appointmentStatus: "booked",
    date: "2024-03-15",
  },
];

const ITEMS_PER_PAGE = 10;
type STATUS_TYPE =
  | "all"
  | "booked"
  | "completed"
  | "cancelled"
  | "no-show"
  | "ongoing";

type CONSULTATION_TYPE = "all" | "online" | "in-person";
const DoctorAppointmentComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<STATUS_TYPE>("all");
  const [typeFilter, setTypeFilter] = useState<CONSULTATION_TYPE>(
    "all",
  );
  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState<
    "all" | "morning" | "afternoon" | "evening"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const getTimeOfDay = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter((apt) => {
      const matchesSearch = apt.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || apt.appointmentStatus === statusFilter;
      const matchesType =
        typeFilter === "all" || apt.consultationType === typeFilter;
      const matchesDate = !dateFilter || apt.date === dateFilter;
      const matchesTime =
        timeFilter === "all" || getTimeOfDay(apt.time) === timeFilter;
      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesDate &&
        matchesTime
      );
    });
  }, [searchQuery, statusFilter, typeFilter, dateFilter, timeFilter]);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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

  const column: ColumnType<object> = [
    { key: "id", title: "Sl", render: (_v, _r, _d, i) => i + 1 },
    { key: "time", title: "Date & Time", render: (v) => v },
    {
      key: "name",
      title: "Patient Name",
      render: (_v, r) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${r.patientColor} flex items-center justify-center text-white font-semibold text-sm`}
          >
            {r.patientInitials}
          </div>
          <span className="font-medium text-slate-900">{r.patientName}</span>
        </div>
      ),
    },
    {
      key: "type",
      title: "Appointment Type",
      render: (_v, r) => (
        <div className="flex items-center gap-2">
          {r.consultationType === "online" ? (
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
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(r.appointmentStatus)}`}
        >
          {r.appointmentStatus === "no-show"
            ? "No-Show"
            : r.appointmentStatus.charAt(0).toUpperCase() +
              r.appointmentStatus.slice(1)}
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
          {canCancelAppointment(r.appointmentStatus) && (
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
              setCurrentPage(1);
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
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as STATUS_TYPE);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No-Show</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as CONSULTATION_TYPE);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setTypeFilter("all");
              setDateFilter("");
              setTimeFilter("all");
              setCurrentPage(1);
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
          <TableComponent columns={column} data={mockAppointments} />
          <Pagination currentPage={currentPage} totalPages={10} onPageChange={(page)=>{setCurrentPage(page)}}/>
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Patient Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900">
                      {appointment.time}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${appointment.patientColor} flex items-center justify-center text-white font-semibold text-sm`}
                      >
                        {appointment.patientInitials}
                      </div>
                      <span className="font-medium text-slate-900">
                        {appointment.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {appointment.consultationType === "online" ? (
                        <>
                          <span className="text-blue-600">📱</span>
                          <span className="text-sm text-slate-600">Online</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-600">👤</span>
                          <span className="text-sm text-slate-600">
                            In-Person
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-2 font-medium ${getPaymentStatusColor(appointment.paymentStatus)}`}
                    >
                      <span>
                        {getPaymentStatusIcon(appointment.paymentStatus)}
                      </span>
                      <span className="text-sm capitalize">
                        {appointment.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.appointmentStatus)}`}
                    >
                      {appointment.appointmentStatus === "no-show"
                        ? "No-Show"
                        : appointment.appointmentStatus
                            .charAt(0)
                            .toUpperCase() +
                          appointment.appointmentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canCancelAppointment(appointment.appointmentStatus) && (
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Cancel appointment"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedAppointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No appointments found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredAppointments.length > 0 && (
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
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-semibold text-sm transition ${
                        currentPage === page
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
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorAppointmentComponent;
