import { useQuery } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"

export const useGetPatientLiveQueueQuery = (id : string) => {
  return useQuery({
    queryKey : ['live-queue'],
    queryFn : ()=>appointmentService.getLiveQueue(id)
  })
}