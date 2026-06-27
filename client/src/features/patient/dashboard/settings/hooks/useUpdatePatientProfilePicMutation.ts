import { useMutation } from "@tanstack/react-query"
import { patientProfileService } from "../../../services/profile.service"

export const useUpdatePatientProfilePicMutation = () => {
  return useMutation({
    mutationFn : (file : Blob) => patientProfileService.updateProfilePic(file)
  })
}