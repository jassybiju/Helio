import { useState } from "react";
import { ColumnType } from "@/src/components/TableComponent";
import { useDebounce } from "@/src/hooks/useDebounce";
import { AppointmentParams, AppointmentResponse } from "../../services/appointment.service";
import { useGetAppointmentQuery } from "./useGetAppointmentQuery";

export const useAdminAppointment = () => {
  const limit = 10;
  const [filter, setFilter] = useState<AppointmentParams>({
    page: 1,
    limit,
  });
  const debouncedSearch = useDebounce(filter);
  const { data } = useGetAppointmentQuery(debouncedSearch);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const appointments = data?.data.appointments ?? [];
  const totalCount = data?.data.totalCount;
  const totalPages = Math.ceil(totalCount! / limit);

  const columns: ColumnType<AppointmentResponse> = [
    {
      key: "id",
      title: "id",
      render: (v) => (
        <div className="flex items-center gap-3">
          
          <div>
            {/* <p className="text-sm font-medium text-slate-900">{row.fullName}</p> */}
            <p className="text-xs text-slate-500">{v}</p>
          </div>
        </div>
      ),
    },
    {
      key: "patientName",
      title: "patientName",
      render: (v) => (
        <div className="text-sm">
          {v}
          {/* <p className="text-slate-900">{row.email}</p> */}
        </div>
      ),
    },
    {
      key: "doctorName",
      title: "Doctor Name",
      render: (v) => (
        <div className="text-sm">
          <p className="text-xs text-slate-500 uppercase">
            {v}
          </p>
        </div>
      ),
    },
    {
      key: "specialty",
      title: "Specialization",
      render: (v) => (
        <span className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
          {v}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (v) => (
        <div className="flex items-center gap-2">
          <span
            // className={`px-3 py-1 flex text-nowrap rounded-full text-xs font-medium border  ${row.status === "active" ? "text-green-700" : "text-red-600"}`}
          >
            {v}
            {/* {row.status === "active" ? "✓ Active" : "✗ Blocked"} */}
          </span>
        </div>
      ),
    },

  ];

  return {
    totalPages,
    totalCount,
    appointments,
    limit,
    showAdvancedSearch,
    setShowAdvancedSearch,
    filter,
    setFilter,
    columns,
  };
};
