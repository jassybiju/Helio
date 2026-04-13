import { useQuery } from "@tanstack/react-query"
import { patientProfileService } from "../../services/profile.service"

export const useGetPatientQuery = () => {
 return useQuery({
  queryKey : ['profile'],
  queryFn : patientProfileService.getProfile
 }) 
}