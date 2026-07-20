import { useMutation } from "@tanstack/react-query";
import { appointmentService } from "../../../services/appointment.service";
import { invalidateQuery } from "@/src/libs/queryClient";

export const useCancelAndRefundAppointmentMutation = (appointmentId: string) => {
  return useMutation({
    mutationFn: () => appointmentService.cancelAndRefundAppointment(appointmentId, ),
    onSuccess : ()=>{
      invalidateQuery('appointment')
    }
  });
};
