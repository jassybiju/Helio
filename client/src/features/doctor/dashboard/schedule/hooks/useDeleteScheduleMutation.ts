import { useMutation } from "@tanstack/react-query"
import { doctorScheduleService } from "../../../services/schedule.service"
import { invalidateQuery } from "@/src/libs/queryClient"

export const useDeleteScheduleMutation = () => {
  return useMutation({
    mutationFn : (id : string)=>doctorScheduleService.deleteSchedule(id),
    onSuccess(){
      invalidateQuery('schedule')
    }
  })
}