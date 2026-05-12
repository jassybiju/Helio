import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { APPOINTMENT_STATUS, CONSULTATION_TYPE } from "@/src/types/appointment.types";

export const appointmentService = {
  getCheckout: (id: string) => {
    return apiRequest("patient/appointment/" + id, HTTP_METHOD.GET) as Promise<
      APIResponse<{
        appointmentId: string;
        doctorId: string;
        doctorName: string;
        start_time: Date;
        end_time: Date;
        consultationType: CONSULTATION_TYPE;
        consultationFee: number;
        platformFee: number;
        status: APPOINTMENT_STATUS;
        totalFee : number
      }>
    >;
  },

  postCheckout : (id : string, type : string) => {
    return apiRequest(API_ENDPOINT.PATIENT.APPOINTMENT.ID.CHECKOUT(id), HTTP_METHOD.POST,{type} )
  }
};
