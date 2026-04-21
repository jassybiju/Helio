import { useMutation } from "@tanstack/react-query";
import { adminDoctorService } from "../../services/doctor.service";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { invalidateQuery } from "@/src/libs/queryClient";

export const useToggleBlockDoctor = () => {
  return useMutation({
    mutationFn: (userId: string) => adminDoctorService.toggleDoctor(userId),
    onSuccess: () => {
      toast.success("Doctor Toggled Succesfully");
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
