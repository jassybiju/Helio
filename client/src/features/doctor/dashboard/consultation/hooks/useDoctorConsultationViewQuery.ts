import { useQuery } from "@tanstack/react-query"
import { doctorConsultationService } from "../../../services/consultation.service"

export const useDoctorConsultationViewQuery = (id : string) => {
  return useQuery({
    queryKey : ['consultation'],
    queryFn : ()=>doctorConsultationService.viewConsultation(id)
  })
}