import { useMutation } from "@tanstack/react-query"
import { patientProfileService } from "../../services/profile.service"

export const useUpdatePatientProfileMutation = ()=> {
  return useMutation({
    mutationFn : patientProfileService.updatePatient
  })
}