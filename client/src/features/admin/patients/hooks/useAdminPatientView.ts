import { useModal } from "@/src/hooks/useModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePatientQuery } from "./usePatientQuery";
import { PatientView } from "../../services/patient.service";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import { useToggleBlockPatient } from "./useToggleBlockPatient";

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
      message: `Are you sure you want to ${!data?.data.isBlocked ? "block" : "unblock"} patient`,
      title: `${!data?.data.isBlocked ? "Block" : "Unblock"} Patient`,
    });
  };

  console.log(data?.data);
  return {
    patient: data?.data as PatientView,
    isLoading,
    handleToggleBlock,
  };
};
