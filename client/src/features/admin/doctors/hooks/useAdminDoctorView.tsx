import { useEffect, useState } from "react";
import { useDoctorQuery } from "./useDoctorQuery";
import { useRouter } from "next/navigation";
import { DoctorView } from "../../services/doctor.service";
import { useModal } from "@/src/hooks/useModal";
import ViewPDFModal from "@/src/components/ViewPDFModal";
import { useToggleBlockDoctor } from "./useToggleBlockDoctor";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import { useDoctorApproval } from "./useDoctorApproval";
import DoctorApprovalModal from "../components/DoctorApprovalModal";
import { DOCTOR_STATUS } from "@/src/types/user.types";

export const useAdminDoctorView = (id: string) => {
  const router = useRouter();
  const { data, isError, isLoading } = useDoctorQuery(id);
  const { open } = useModal();
  const { mutate: toggleDoctorStatus } = useToggleBlockDoctor();
  const { mutate: updateDoctorApproval } = useDoctorApproval(id);
  const [expandedHistory, setExpandedHistory] = useState<number | null>(null);

  useEffect(() => {
    if (isError) router.replace("/doctor");
  }, [isError, router]);

  const handleToggleBlock = () => {
    open(ConfirmModal, {
      onConfirm: () => toggleDoctorStatus(id),
      message: `Are you sure you want to ${!data?.data.doctor.isBlocked ? "block" : "unblock"} doctor`,
      title: `${!data?.data.doctor.isBlocked ? "Block" : "Unblock"} Doctor`,
    });
  };

  const handleDoctorApproval = (status: DOCTOR_STATUS) => {
    open(DoctorApprovalModal, {
      onConfirm: (reason?: string) =>
        updateDoctorApproval({
          verification_status: status,
          rejection_reason: reason,
        }),
      status: status,
      title: `${status === DOCTOR_STATUS.APPROVED ? "Approve" : "Reject"} doctor`,
    });
  };

  const showDocumentModal = (url: string) => {
    open(ViewPDFModal, { file: url, title: "Document" });
  };

  const appointmentStatus = data?.data.appointmentStatusDistribution
  const appointmentStatusData = [
    {
      name: "Confirmed",
      value: appointmentStatus?.confirmed,
      color: "#3b82f6",
    },
    {
      name: "Completed",
      value: appointmentStatus?.completed,
      color: "#10b981",
    },
    { name: "Ongoing", value: appointmentStatus?.ongoing, color: "#8b5cf6" },
    // { name: "No Show", value: appointmentStatus?.noShow, color: "#f59e0b" },
    { name: "Expired", value: appointmentStatus?.expired, color: "#6b7280" },
    {
      name: "Cancelled",
      value: appointmentStatus?.cancelled,
      color: "#ef4444",
    },
  ];
  return {
    doctor: data?.data.doctor as DoctorView["doctor"],
    totalAppointments: data?.data.totalAppointments,
    appointmentStatusData,
    showDocumentModal,
    isLoading,
    expandedHistory,
    setExpandedHistory,
    handleToggleBlock,
    handleDoctorApproval,
  };
};
