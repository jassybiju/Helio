import { useMutation } from "@tanstack/react-query"
import { doctorConsultationService } from "../../../services/consultation.service"
import { invalidateQuery } from "@/src/libs/queryClient"

export const useDoctorRemovePrescription = (id : string) => {
  return useMutation({
    mutationFn : (name :string) => doctorConsultationService.removePrescription(id, name),
    onSuccess : ()=>{
      invalidateQuery('consultation')
    }
  })
}