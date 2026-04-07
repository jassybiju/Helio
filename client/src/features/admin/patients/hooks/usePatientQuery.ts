import { useQuery } from "@tanstack/react-query"
import { adminPatientService } from "../../services/patient.service"

export const usePatientQuery = (id : string) => {
  return useQuery({
    queryKey : ['patients', id],
    queryFn : ()=>adminPatientService.getPatient(id)
  })
}