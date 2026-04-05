import { useQuery } from "@tanstack/react-query"
import { verificationService } from "../services/verification.service"

export const useDoctorVerificationDetails =()=> {
  return useQuery({
    queryKey : ['doctor','verification'],
    queryFn : verificationService.getVerificationDetails,

  })
}