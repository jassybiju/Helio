import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminPatientService } from "../../services/patient.service";

export const useToggleBlockPatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => adminPatientService.togglePatient(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
