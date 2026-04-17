import { useQuery } from "@tanstack/react-query"
import { doctorProfileService } from "../../../services/profile.service"

export const useGetDoctorQuery = () => {
  return useQuery({
    queryKey : ['profile'],
    queryFn : doctorProfileService.getProfile
  })
}