import { useQuery } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"

export const useGetLabReportQuery = (data : {page : number, limit: number}) => {
  return useQuery({
    queryKey : ['lab-report'],
    queryFn :()=> appointmentService.getLabReport(data)
  })
}