import { useQuery } from "@tanstack/react-query";
import { adminAppointmentService, AppointmentParams } from "../../services/appointment.service";

export const useGetAppointmentQuery = (params: AppointmentParams) => {
  return useQuery({
    queryKey: ["appointment", params],
    queryFn: () => adminAppointmentService.getAppointments(params),
  });
};
