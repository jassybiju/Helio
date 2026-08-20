import { useMutation } from "@tanstack/react-query";
import { patientProfileService } from "../../../services/profile.service";
import { toast } from "react-toastify";
import { invalidateQuery } from "@/src/libs/queryClient";
import { isAxiosError } from "axios";

export const useUpdatePatientProfileMutation = (
  onSuccessClose?: () => void,
) => {
  return useMutation({
    mutationFn: patientProfileService.updatePatient,
    onSuccess(data) {
      onSuccessClose?.();
      toast.success(data.message);
      invalidateQuery("profile");
    },
    onError(err){
      if(isAxiosError(err)){
        toast.error(err.response?.data.message)
      }
    }
  });
};
