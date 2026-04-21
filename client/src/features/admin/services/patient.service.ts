import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { PatientQueryParams } from "../patients/hooks/usePatientsQuery";

export type Patients = {
  id: string;
  fullName: string;
  email: string;
  status: "active" | "blocked";
  verificationStatus: boolean;
  createdAt: string;
  dob: string;
  gender: string;
  blood_group: string;
  phone: string;
};

export type PatientView = {
  id: string;
  email: string;
  fullName: string;

  gender: "male" | "female" | "other" | null;
  dob: string | null;
  bloodGroup: string | null;
  phone: string | null;

  isVerified: boolean;
  isBlocked: boolean;

  createdAt: string;
  updatedAt: string;
};
export const adminPatientService = {
  async getPatients(params?: PatientQueryParams) {
    console.log(params);
    return (await apiRequest(
      "/admin/patient",
      HTTP_METHOD.GET,
      null,
      params,
    )) as APIResponse<{ patients: Patients[]; totalCount: number }>;
  },
  async togglePatient(userId: string) {
    console.log("toggled");
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
