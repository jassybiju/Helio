import { useQuery } from "@tanstack/react-query"
import { doctorConsultationService } from "../../../services/consultation.service"

export const useDoctorViewHistoryQuery = (id : string) => {
  return useQuery({
    queryKey : ['consultation-history'],
    queryFn:()=> doctorConsultationService.viewHistory(id)
  })
}