import React, { useState } from "react";
import { PatientQueryParams, usePatientsQuery } from "./usePatientsQuery";
import { ColumnType } from "@/src/components/TableComponent";
import { Patients } from "../../services/patient.service";
import { Eye, Lock, Unlock } from "lucide-react";
import { useToggleBlockPatient } from "./useToggleBlockPatient";
import { useModal } from "@/src/hooks/useModal";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import Link from "next/link";
import { useDebounce } from "@/src/hooks/useDebounce";
import Image from "next/image";

export const useAdminPatient = () => {
  const limit = 2;
  const [filter, setFilter] = useState<PatientQueryParams>({
    page: 1,
    limit,
    isVerified: null,
  });
  const debouncedSearch = useDebounce(filter);
  const { open } = useModal();
  const { data } = usePatientsQuery(debouncedSearch);
  const { mutate } = useToggleBlockPatient();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const patients = data?.data.patients ?? [];
  const totalCount = data?.data.totalCount;
  const totalPages = Math.ceil(totalCount! / limit);

  const handleToggleBlock = (row: Patients) => {
    open(ConfirmModal, {
      patientName: row.fullName,
      currentStatus: row.status as "active" | "blocked",
      onConfirm: () => mutate(row.id),
      message: `Are you sure you want to ${row.status === "active" ? "block" : "unblock"} patient`,
      title: `${row.status === "active" ? "Block" : "Unblock"} Patient`,
    });
  };

  const columns: ColumnType<Patients> = [
    {
      key: "",
      title: "Patient",
      render: (_value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10  overflow-hidden shrink-0 relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {row.profilePic ? (
              <Image
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
                alt="Profile"
                className="h-full w-full object-cover"
                src={row.profilePic}
                unoptimized
              />
            ) : (
              row.fullName[0]
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
          <p className="text-xs text-slate-500">{row.phone}</p>
        </div>
      ),
    },
    {
      key: "",
      title: "Dob / Gender",
      render: (_value, row) => (
        <div className="text-sm">
          <p className="text-slate-900">{new Date(row.dob).toDateString()}</p>
          <p className="text-xs text-slate-500 uppercase">{row.gender}</p>
        </div>
      ),
    },
    {
      key: "",
      title: "Blood Group",
      render: (_value, row) => (
        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
          {row.blood_group ?? "-"}
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
        <span
          className={`px-3 py-1 text-nowrap rounded-full text-xs font-medium border ${
            row.verificationStatus
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-yellow-50 text-yellow-700 border-yellow-200"
          }`}
        >
          {row.verificationStatus ? "✓ Verified" : "⏳ Pending"}
        </span>
      ),
    },
    {
      key: "",
      title: "Actions",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/patients/${row.id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
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
    patients,
    limit,
    showAdvancedSearch,
    setShowAdvancedSearch,
    filter,
    setFilter,
    columns,
  };
};
