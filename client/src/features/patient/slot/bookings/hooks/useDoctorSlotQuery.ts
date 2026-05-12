import { useQuery } from "@tanstack/react-query"
import { patientSearchService } from "../../../services/search.service"

export const useDoctorSlotQuery = (doctorId : string) => {
  console.log(doctorId)
  return useQuery({
    queryKey : ['doc-slots', doctorId],
    queryFn : ()=> patientSearchService.getSlots(doctorId)
  })
}