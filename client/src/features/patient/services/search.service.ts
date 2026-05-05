import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { SearchDoctorsQueryParams } from "../search/hooks/usePatientSearchDoctor";

export interface Doctor {
  doctorId: string;
  name: string;
  specialization: string;
  experienceYears: number;
  fees: { online: number; clinic: number };
  rating: number;
  reviews: number;
  nextAvailableSlot: string;
  image: string;
}

export const patientSearchService = {
  search(params: SearchDoctorsQueryParams) {
    return apiRequest(
      API_ENDPOINT.PATIENT.DOCTOR.BASE,
      HTTP_METHOD.GET,
      null,
      params,
    ) as Promise<
      APIResponse<{ data: Doctor[]; total: number; totalPages: number }>
    >;
  },
  getSlots(doctorId: string) {
    return apiRequest(
      API_ENDPOINT.PATIENT.DOCTOR.ID(doctorId),
      HTTP_METHOD.GET,
    ) as Promise<
      APIResponse<{doctor : Doctor, slots : 
        Record<
          string,
          {
            clinic: { times: string[]; location: string };
            online: { times: string[] };
          }
          >}
        >
    >;
  },
};
