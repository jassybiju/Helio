import { useMutation } from "@tanstack/react-query";
import { doctorScheduleService } from "../../../services/schedule.service";
import { invalidateQuery } from "@/src/libs/queryClient";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const useSetScheduleMutation = () => {
  return useMutation({
    mutationFn: doctorScheduleService.setSchedule,
    onSuccess: () =>{
      invalidateQuery('schedule')
      invalidateQuery('slots')
    },
    onError(error){
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
      }
    }
  });
};
