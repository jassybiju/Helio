import { useMutation } from "@tanstack/react-query";
import { patientProfileService } from "../../services/profile.service";
import { invalidateQuery } from "@/src/libs/queryClient";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const useAddAllergenMutation = () => {
  return useMutation({
    mutationFn: (data: { allergen: string; severity: string }) =>
      patientProfileService.addAllergen(data),
    onSuccess: () => {
      invalidateQuery("profile");
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

export const useRemoveAllergenMutation = () => {
  return useMutation({
    mutationFn: (id: string) => patientProfileService.removeAllergen(id),
    onSuccess: () => {
      invalidateQuery("profile");
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
