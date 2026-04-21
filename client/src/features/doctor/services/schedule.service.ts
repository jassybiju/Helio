import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { HTTP_METHOD } from "@/src/types/API.types";
import {
  DAY_OF_WEEK,
  SetDoctorScheduleFormData,
} from "../dashboard/schemas/schedule.schema";

export type IGetDoctorScheduleDTO = {
  id: string;
  doctorId: string;
  dayOfWeek: DAY_OF_WEEK;
  startTime: string;
  endTime: string;
  consultationType: "ONLINE" | "CLINIC";
  location: string | null;
  slotIntervalInMinutes: number;
  capacityPerSlot: number;
  createdAt: string;
};

export const doctorScheduleService = {
  setSchedule: (data: SetDoctorScheduleFormData) => {
    return apiRequest(
      API_ENDPOINT.DOCTOR.SCHEDULE.BASE,
      HTTP_METHOD.POST,
      data,
    );
  },
  getSchedule: () => {
    return apiRequest<IGetDoctorScheduleDTO[]>(
      API_ENDPOINT.DOCTOR.SCHEDULE.BASE,
      HTTP_METHOD.GET,
    );
  },
  deleteSchedule : (id : string) => {
    return apiRequest<IGetDoctorScheduleDTO[]>(
      API_ENDPOINT.DOCTOR.SCHEDULE.ID(id),
      HTTP_METHOD.DELETE,
    );
  }
};
