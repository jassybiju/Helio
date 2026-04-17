import { useMutation } from "@tanstack/react-query";
import { verificationService } from "../../services/verification.service";
import { DoctorVerificationFormData } from "../schema/verification.schema";
import { invalidateQuery, queryClient } from "@/src/libs/queryClient";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useDoctorResubmitVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: DoctorVerificationFormData) =>
      verificationService.resubmit(data),
    onSuccess: () => {
      invalidateQuery("doctor");
      toast.success("Resubmit Successfull");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      toast.error("Resubmit Failed");
    },
  });
};
