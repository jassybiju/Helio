import { useQuery } from "@tanstack/react-query"
import { doctorAppointmentService } from "../../../services/appointment.service"

export const useGetDoctorAppointmentQuery = (id : string) => {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn :()=> doctorAppointmentService.getAppointment(id)
  })
}