import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"
import { PatientQueryParams } from "../patients/hooks/usePatientQuery"

export type Patients = {
      id: string;
    fullName: string;
    email: string;
    status: "active" | "blocked";
    verificationStatus: boolean;
    createdAt: string;
    dob : string,
    gender : string,
    blood_group : string,
    phone: string;
}

export const adminPatientService = {
  async getPatients(params? : PatientQueryParams) {
    console.log(params)
    return await apiRequest('/admin/patient',HTTP_METHOD.GET,null, params) as APIResponse<{patients : Patients[], totalCount : number}>
  },
  async togglePatient(userId: string){
    console.log("toggled")
    return await apiRequest(`/admin/patient/${userId}/status`,HTTP_METHOD.PATCH)

  }
  
}