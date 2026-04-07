import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDoctorService } from "../../services/doctor.service";
import { DOCTOR_STATUS } from "@/src/types/user.types";
import { invalidateQuery } from "@/src/libs/queryClient";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useDoctorApproval = (
  userId: string,
 
) => {
  return useMutation({
    mutationFn: ( {
    verification_status,
    rejection_reason,
  }: { verification_status: DOCTOR_STATUS; rejection_reason?: string },) =>
      adminDoctorService.doctorApproval(userId, {
        rejection_reason,
        verification_status,
      }),
    onSuccess: () => {
      toast.success('Doctor Apprvoal Status Updated Successfully')
      invalidateQuery("doctors");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Toggle Status Failed");
      } else {
        toast.error("Toggle Status Failed");
      }
    },
  });
};
