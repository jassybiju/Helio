import { useState } from "react";
import { DoctorQueryParams, useDoctorsQuery } from "./useDoctorsQuery";
import { ColumnType } from "@/src/components/TableComponent";
import { Doctor } from "../../services/doctor.service";
import { Eye, Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import { useModal } from "@/src/hooks/useModal";
import { useToggleBlockDoctor } from "./useToggleBlockDoctor";
import Image from "next/image";
import { useDebounce } from "@/src/hooks/useDebounce";

export const useAdminDoctor = () => {
  const limit = 2;
  const [filter, setFilter] = useState<DoctorQueryParams>({
    page: 1,
    limit,
    isVerified: null,
  });
  const debouncedSearch = useDebounce(filter)
  const { open } = useModal();
  const { data } = useDoctorsQuery(debouncedSearch);
  const { mutate } = useToggleBlockDoctor();
  const router = useRouter();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const doctors = data?.data.doctors ?? [];
  const totalCount = data?.data.totalCount;
  const totalPages = Math.ceil(totalCount! / limit);

  const handleToggleBlock = (row: Doctor) => {
    open(ConfirmModal, {
      patientName: row.fullName,
      currentStatus: row.status as "active" | "blocked",
      onConfirm: () => mutate(row.id),
      message: `Are you sure you want to ${row.status === "active" ? "block" : "unblock"} doctor`,
      title: `${row.status === "active" ? "Block" : "Unblock"} Doctor`,
    });
  };

  const columns: ColumnType<Doctor> = [
    {
      key: "",
      title: "Doctor",
      render: (_value, row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-gradient-to-br shrink-0 from-blue-400 overflow-hidden to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {row.profilePic ? (
              <Image
              alt=""
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
                className="w-full h-full object-cover "
                src={row.profilePic}
              />
            ) : (
              row.fullName?.[0]
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{row.fullName}</p>
            <p className="text-xs text-slate-500">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "",
      title: "Contact",
      render: (_value, row) => (
        <div className="text-sm">
          <p className="text-slate-900">{row.email}</p>
        </div>
      ),
    },
    {
      key: "",
      title: "Career Start Year",
      render: (_value, row) => (
        <div className="text-sm">
          <p className="text-xs text-slate-500 uppercase">
            {row.career_start_year}
          </p>
        </div>
      ),
    },
    {
      key: "",
      title: "Specialization",
      render: (_value, row) => (
        <span className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
          {row.specialization}
        </span>
      ),
    },
    {
      key: "",
      title: "Status",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 flex text-nowrap rounded-full text-xs font-medium border  ${row.status === "active" ? "text-green-700" : "text-red-600"}`}
          >
            {row.status === "active" ? "✓ Active" : "✗ Blocked"}
          </span>
        </div>
      ),
    },
    {
      key: "",
      title: "Verified",
      render: (_value, row) => (
        <>
          <span
            className={`px-3 py-1 text-nowrap rounded-full text-xs font-medium border ${
              row.verificationStatus
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }`}
          >
            {row.verificationStatus ? "✓ Verified" : "⏳ Pending"}
          </span>
          <span
            className={`px-3 py-1 text-nowrap rounded-full text-xs font-medium border ${
              row.verificationStatus
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }`}
          >
            {row.isVerified ? "✓ OTP Verified" : "⏳OTP Verification Pending"}
          </span>
        </>
      ),
    },
    {
      key: "",
      title: "Actions",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
            onClick={() => router.push(`/doctor/${row.id}`)}
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => handleToggleBlock(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
          >
            {row.status === "active" ? (
              <>
                <Lock className="w-4 h-4" />
                Block
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Unblock
              </>
            )}
          </button>
        </div>
      ),
    },
  ];

  return {
    totalPages,
    totalCount,
    doctors,
    limit,
    showAdvancedSearch,
    setShowAdvancedSearch,
    filter,
    setFilter,
    columns,
  };
};
