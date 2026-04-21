import { useMutation } from "@tanstack/react-query";
import { doctorProfileService } from "../../../services/profile.service";
import { toast } from "react-toastify";
import { invalidateQuery } from "@/src/libs/queryClient";

export const useUpdateDoctorMutation = (onSuccessClose: () => void) => {
  return useMutation({
    mutationFn: doctorProfileService.updateProfile,
    onSuccess(data) {
      onSuccessClose?.();
      toast.success(data.message);
      invalidateQuery("profile");
    },
  });
};
