import { useMutation } from "@tanstack/react-query";
import { appointmentService } from "../../../services/appointment.service";
import { invalidateQuery } from "@/src/libs/queryClient";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useCancelPatientAppointmentMutation = (appointmentId: string) => {
  return useMutation({
    mutationFn: () => appointmentService.cancelAppointment(appointmentId, ),
    onSuccess : ()=>{
      invalidateQuery('appointment')
      toast.success("APPOINTMENT CANCELLED SUCCESFULLY")
    },
    onError(error){
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
      }
    }
  });
};
