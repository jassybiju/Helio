import { useMutation } from "@tanstack/react-query";
import { appointmentService } from "../../../services/appointment.service";

export const useRescheduleAppointmentMutation = (appointmentId: string) => {
  return useMutation({
    mutationFn: (data: {
      startTime: string;
      consultationType: "ONLINE" | "CLINIC";
    }) => appointmentService.rescheduleAppointment(appointmentId, data),
  });
};
