import { useQuery } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"

export const useGetPatientRescheduleSlotsQuery = (appointmentId : string) => {
  return useQuery({
    queryKey : ['reshedule-slots'],
    queryFn :()=> appointmentService.getRescheduleSlots(appointmentId)
  })
}