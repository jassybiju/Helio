import { useMutation } from "@tanstack/react-query"
import { doctorConsultationService } from "../../../services/consultation.service"
import { toast } from "react-toastify"

export const useDoctorCompleteConsultationMutation = (id : string) => {
  return useMutation({
    mutationFn : ()=>doctorConsultationService.endConsultation(id),
    onSuccess(data){
      toast.success(data.message)
    }
  })
}