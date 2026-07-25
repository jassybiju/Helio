import { useModal } from "@/src/hooks/useModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePatientQuery } from "./usePatientQuery";
import { PatientView } from "../../services/patient.service";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import { useToggleBlockPatient } from "./useToggleBlockPatient";
import { ColumnType } from "@/src/components/TableComponent";
import { CONSULTATION_TYPE } from "@/src/types/appointment.types";

export const useAdminPatientView = (id: string) => {
  const router = useRouter();
  const { data, isError, isLoading } = usePatientQuery(id);
  const { open } = useModal();
  const { mutate } = useToggleBlockPatient();
  useEffect(() => {
    if (isError) router.replace("/patient");
  }, [isError, router]);

  const handleToggleBlock = () => {
    open(ConfirmModal, {
      onConfirm: () => mutate(id),
      message: `Are you sure you want to ${!data?.data.patient.isBlocked ? "block" : "unblock"} patient`,
      title: `${!data?.data.patient.isBlocked ? "Block" : "Unblock"} Patient`,
    });
  };

  const column: ColumnType<PatientView["appointments"][0]> = [
    {
      key: "sl",
      title: "SL No.",
      render: (_v, _r, _d, i) => i + 1,
    },
    {
      key: "doctorName",
      title: "Doctor Name",
      render: (v) => v,
    },
    {
      key: "dateTime",
      title: "Appointment Date",
      render: (v) =>
        new Date(v).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    {
      key: "consultationType",
      title: "Consultation Type",
      render: (v) => <span className="capitalize">{v.replace("_", " ")}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (v) => <span className="capitalize">{v.replace("_", " ")}</span>,
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      render: (v) => <span className="capitalize">{v.replace("_", " ")}</span>,
    },
    {
      key: "createdAt",
      title: "Booked On",
      render: (v) =>
        new Date(v).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
  ];

  return {
    patient: data?.data.patient as PatientView["patient"],
    appointments: data?.data.appointments as PatientView["appointments"],
    column,
    isLoading,
    handleToggleBlock,
  };
};
