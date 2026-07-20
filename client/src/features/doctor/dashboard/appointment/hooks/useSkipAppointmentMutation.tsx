import { useMutation } from "@tanstack/react-query"
import { doctorAppointmentService } from "../../../services/appointment.service"
import { invalidateQuery } from "@/src/libs/queryClient"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

export const useSkipAppointmentMutation = () => {
  return useMutation({
    mutationFn : doctorAppointmentService.skipConsultation,
        onSuccess(data){
          invalidateQuery('appointment')
          invalidateQuery('today-appointment')
          toast.success(data.message)
        },
        onError(error){
          if(isAxiosError(error)){
            toast.error(error.response?.data.message)
          }
        }
  })
}