import { useQuery } from "@tanstack/react-query"
import { doctorAppointmentService } from "../../../services/appointment.service"

export const useGetDoctorTodaysAppointmentQuery =() => {
  return useQuery({
    queryKey : ['today-appointment'],
    queryFn : doctorAppointmentService.getTodayAppointment
  })
}