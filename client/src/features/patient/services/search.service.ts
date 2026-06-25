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
  getSlots(doctorId: string, page: number, limit : number) {
    return apiRequest(
      API_ENDPOINT.PATIENT.DOCTOR.ID(doctorId),
      HTTP_METHOD.GET,
      null,
      {page, limit}

    ) as Promise<
      APIResponse<{
        doctor: Doctor;
        slots: Record<
          string,
          {
            clinic: {
              slots: { time: string; status: string }[];
              location: string;
            };
            online: { slots: { time: string; status: string }[] };
          }
        >;
        reviews : {
          id : string,
          patientName : string,
          createdAt : string,
          ratings : number,
          comments : string,
          profilePic: string
        }[],
        totalCount : number[]
      }>
    >;
  },
};
