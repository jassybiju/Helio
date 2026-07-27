import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { PatientQueryParams } from "../patients/hooks/usePatientsQuery";

export type Patients = {
  id: string;
  fullName: string;
  email: string;
  status: "active" | "blocked";
  verificationStatus: boolean;
  profilePic : string | null;
  createdAt: string;
  dob: string;
  gender: string;
  blood_group: string;
  phone: string;
};

export type PatientView = {
  patient : {
  id: string;
  email: string;
  fullName: string;

  gender: string | null;
  dob: string | null;
  bloodGroup: string | null;
  phone: string | null;

  isVerified: boolean;
  isBlocked: boolean;

  createdAt: string;
  updatedAt: string;
  },
  appointments : {
    id : string,
    doctorName : string,
    dateTime : string,
    consultationType : string,
    status : string,
    paymentStatus : string,
    createdAt : string
  }[],
  totalAppointments : number

};
export const adminPatientService = {
  async getPatients(params?: PatientQueryParams) {
    return (await apiRequest(
      "/admin/patient",
      HTTP_METHOD.GET,
      null,
      params,
    )) as APIResponse<{ patients: Patients[]; totalCount: number }>;
  },
  async togglePatient(userId: string) {
    return await apiRequest(
      `/admin/patient/${userId}/status`,
      HTTP_METHOD.PATCH,
    );
  },

  getPatient(userId: string) {
    return apiRequest(`/admin/patient/${userId}`, HTTP_METHOD.GET) as Promise<
      APIResponse<PatientView>
    >;
  },
};
