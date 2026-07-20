import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { patientSearchService } from "../../../services/search.service"

export const useDoctorSlotQuery = (doctorId : string, page : number, limit : number) => {
  return useQuery({
    queryKey : ['doc-slots', {doctorId,page,limit}],
    placeholderData : keepPreviousData,
    queryFn : ()=> patientSearchService.getSlots(doctorId, page, limit)
  })
}