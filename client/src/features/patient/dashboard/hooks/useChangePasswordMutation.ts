import { useMutation } from "@tanstack/react-query"
import { patientProfileService } from "../../services/profile.service"
import { toast } from "react-toastify"

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn : ({newPassword, oldPassword} : {newPassword: string, oldPassword : string})=>patientProfileService.changePassword({newPassword, oldPassword}),
    onSuccess : () => {
      toast.success("Password Changed Successfuly")
    },onError() {
      toast.error("Error in changing password")
    }
  })
}