import { useModal } from "@/src/hooks/useModal";
import { useDoctorVerificationDetails } from "./useDoctorVerificationDetails";
import ViewPDFModal from "@/src/components/ViewPDFModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DoctorVerificationFormData,
  doctorVerificationSchema,
} from "../schema/verification.schema";
import { verificationService } from "../services/verification.service";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useDoctorResubmitVerificationMutation } from "./useDoctorResubmitVerificationMutation";

export const useDoctorPendingApproval = () => {
  const { data } = useDoctorVerificationDetails();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(doctorVerificationSchema) });
  const {mutate, isPending,} = useDoctorResubmitVerificationMutation()
  const {
    verification_history = [],
    verification_status,
    rejection_reason,
    document_url,
  } = data?.data || {};

  const { open } = useModal();
  const handleDocumentView = (url: string) => {
    open(ViewPDFModal, { title: "View Document", file: url });
  };

  const onSubmit  = (data : DoctorVerificationFormData) => {
    mutate(data)
  }

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    verification_history,
    verification_status,
    rejection_reason,
    document_url,
    isPending,
    handleDocumentView,
  };
};
