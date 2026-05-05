import { useMutation } from "@tanstack/react-query";
import { doctorProfileService } from "../../../services/profile.service";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useUpdateDoctorFeeMutation = () => {
  return useMutation({
    mutationFn: (data: { onlineFee: number; clinicFee: number }) =>
      doctorProfileService.updateFee(data),
    onSuccess(data) {
      toast.success(data.message);
    },onError(error){
      if(isAxiosError(error)){

        toast.error(error.response?.data.message)
      }

    }
  });
};
