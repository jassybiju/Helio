import { useMutation } from "@tanstack/react-query";
import { patientProfileService } from "../../../services/profile.service";
import { toast } from "react-toastify";
import { invalidateQuery } from "@/src/libs/queryClient";

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
  });
};
