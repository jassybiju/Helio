import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { APPOINTMENT_STATUS, CONSULTATION_TYPE, PAYMENT_STATUS } from "@/src/types/appointment.types";

export const adminAppointmentService = {
  async getAppointments(params?: AppointmentParams) {
    return (await apiRequest(
      API_ENDPOINT.ADMIN.APPOINTMENT.GET_ALL,
      HTTP_METHOD.GET,
      null,
      params,
    )) as APIResponse<{ appointments: AppointmentResponse[]; totalCount: number }>;
  },
};

export interface AppointmentParams {
  search?: string | null;
  status?: string | null;
  page: number;
  limit: number;
}

export interface AppointmentResponse {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  type: CONSULTATION_TYPE;
  status: APPOINTMENT_STATUS;
  paymentStatus: PAYMENT_STATUS;
}
