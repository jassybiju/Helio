import { useMutation } from "@tanstack/react-query";
import { appointmentService } from "../../../services/appointment.service";
import { invalidateQuery } from "@/src/libs/queryClient";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useReschedulePatientAppointmentMutation = (
  appointmentId: string,
) => {
  return useMutation({
    mutationFn: (data: {
      startTime: string;
      consultationType: "ONLINE" | "CLINIC";
    }) => appointmentService.reschedulePatientAppointment(appointmentId, data),
    onSuccess: () => {
      invalidateQuery("appointment");
      toast.success("APPOINTMENT Rescheduled SUCCESFULLY");
    },
    onError(error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
};
