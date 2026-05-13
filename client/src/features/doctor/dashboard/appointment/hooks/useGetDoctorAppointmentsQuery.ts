import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { doctorAppointmentService } from "../../../services/appointment.service";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";

export const useGetDoctorAppointmentsQuery = ({
  search,
  date,
  status,
  type,
  page,
  limit
}: {
  search?: string;
  date?: string;
  status?: APPOINTMENT_STATUS;
  type?: CONSULTATION_TYPE;
  page : number,
  limit : number
}) => {
  return useQuery({
    queryKey: ["appointment", {search, date, status, type,page,limit}],
    queryFn: () =>
      doctorAppointmentService.getAppointment({ search, date, status, type ,page, limit}),
    placeholderData : keepPreviousData
  });
};
