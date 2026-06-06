import {  useQuery } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"
import { APPOINTMENT_STATUS } from "@/src/types/appointment.types"

export const useGetAllPatientsQuery=({page, limit,status} : {page : number, limit : number, status? : APPOINTMENT_STATUS}) => {
  return useQuery({
    queryKey : ['appointment',{page,limit,status}],
    queryFn :()=> appointmentService.getAppointments({page,limit,status})
  })
}