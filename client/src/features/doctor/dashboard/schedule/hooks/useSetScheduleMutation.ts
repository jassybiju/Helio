import { useMutation } from "@tanstack/react-query";
import { doctorScheduleService } from "../../../services/schedule.service";
import { invalidateQuery } from "@/src/libs/queryClient";

export const useSetScheduleMutation = () => {
  return useMutation({
    mutationFn: doctorScheduleService.setSchedule,
    onSuccess: () =>{
      invalidateQuery('schedule')
    }
  });
};
