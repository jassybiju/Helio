import { useMutation } from "@tanstack/react-query"
import { doctorProfileService } from "../../../services/profile.service"
import { toast } from "react-toastify"

export const useUpdateDoctorFeeMutation = () => {
  return useMutation({
    mutationFn : (data : {onlineFee : number, clinicFee : number})=>doctorProfileService.updateFee(data),
    onSuccess(data){
      toast.success(data.message)
    },
  })
}