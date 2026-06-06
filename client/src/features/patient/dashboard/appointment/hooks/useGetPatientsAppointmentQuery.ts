import {  useQuery } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"

export const useGetPatientsAppointmentQuery=(id : string) => {
  return useQuery({
    queryKey : ['appointment',{id}],
    queryFn :()=> appointmentService.getAppointment(id)
  })
}