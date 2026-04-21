import { useMutation } from "@tanstack/react-query"
import { doctorScheduleService } from "../../../services/schedule.service"

export const useDeleteScheduleMutation = () => {
  return useMutation({
    mutationFn : (id : string)=>doctorScheduleService.deleteSchedule(id)
  })
}