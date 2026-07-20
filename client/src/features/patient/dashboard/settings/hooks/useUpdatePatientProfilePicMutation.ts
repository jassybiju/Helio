import { useMutation } from "@tanstack/react-query"
import { patientProfileService } from "../../../services/profile.service"
import { invalidateQuery } from "@/src/libs/queryClient"
import { toast } from "react-toastify"

export const useUpdatePatientProfilePicMutation = () => {
  return useMutation({
    mutationFn : (file : Blob) => patientProfileService.updateProfilePic(file),
    onSuccess: ()=>{
      invalidateQuery("profile")
      invalidateQuery("me")
      toast.success("Patient Profile Updated")
    }
  })
}