import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";
import React, { useState } from "react";
import { useGetDoctorAppointmentsQuery } from "./useGetDoctorAppointmentsQuery";
import { ColumnType } from "@/src/components/TableComponent";
import { APPOINTMENT_LIST } from "../../../services/appointment.service";
import { ExternalLink, Eye, Play, X } from "lucide-react";
import { useStartDoctorConsultation } from "./useStartDoctorConsultation";
import { useRouter } from "next/navigation";
import { useModal } from "@/src/hooks/useModal";
import ViewDoctorAppointmentModal from "../components/ViewDoctorAppointmentModal";

const LIMIT = 5;
const useDoctorAppointment = (date?: string) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    APPOINTMENT_STATUS | undefined
  >(undefined);
  const [typeFilter, setTypeFilter] = useState<CONSULTATION_TYPE | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState(date ?? "");
  const { data } = useGetDoctorAppointmentsQuery({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    date: dateFilter,
    page: page,
    limit: LIMIT,
  });

  const {mutate :startConsultation} = useStartDoctorConsultation()
  const {open} = useModal()
  const appointments = data?.data.data;
  const totalCount = data?.data.pagination.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT);

 
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

  const canStartConsultation = (status: APPOINTMENT_STATUS, i: number) => {
    return status === APPOINTMENT_STATUS.CONFIRMED && i == 0;
  };

  const viewOngoingConsultation = (id : string) => {
    router.push('/appointment/consultation/'+id)
  }
  const viewAppointment=(id :string)=>{
    open(ViewDoctorAppointmentModal, {id})
  }

  const column: ColumnType<APPOINTMENT_LIST> = [
    { key: "id", title: "Sl", render: (_v, _r, _d, i) => i + 1 },
    {
      key: "time",
      title: "Date & Time",
      render: (v) => new Date(v).toLocaleString("en-US"),
    },
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
      render: (v) => (
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
            onClick={()=>    viewAppointment(r.id)}
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

  const todaysColumn: ColumnType<APPOINTMENT_LIST> = [
    { key: "id", title: "Sl", render: (_v, _r, _d, i) => i + 1 },
    {
      key: "time",
      title: "Date & Time",
      render: (v) => new Date(v).toLocaleString("en-US"),
    },
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
          {r.queueNumber}
        </div>
      ),
    },
    {
      key: "type",
      title: "Appointment Type",
      render: (v) => (
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
          {r.status === APPOINTMENT_STATUS.NO_SHOW
            ? "No-Show"
            : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        </span>
      ),
    },
    {
      key: "status",
      title: "Actions",
      render: (v, r, _d, i) => (
        <div className="flex items-center gap-2">
          <button
          onClick={()=>viewAppointment(r.id)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {canStartConsultation(r.status, i) && (
            <button onClick={()=>startConsultation(r.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Cancel appointment"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
        {r.status === APPOINTMENT_STATUS.ONGOING &&  (
            <button onClick={()=>viewOngoingConsultation(r.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Cancel appointment"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
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

  return {
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
    todaysColumn,
  };
};

export default useDoctorAppointment;
