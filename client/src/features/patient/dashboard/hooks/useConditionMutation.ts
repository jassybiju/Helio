import { useMutation } from "@tanstack/react-query";
import { patientProfileService } from "../../services/profile.service";
import { invalidateQuery } from "@/src/libs/queryClient";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useAddConditionMutation = () => {
  return useMutation({
    mutationFn: (condition: string) =>
      patientProfileService.addCondition(condition),
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

export const useRemoveConditionMutation = () => {
  return useMutation({
    mutationFn: (id: string) => patientProfileService.removeCondition(id),
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
