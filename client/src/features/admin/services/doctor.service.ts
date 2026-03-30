import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"
import { DoctorQueryParams } from "../doctors/hooks/useDoctorQuery";

export type Doctor = {
      id: string;
    fullName: string;
    email: string;
    status: "active" | "blocked";
    verificationStatus: boolean;
    isVerified : string
    createdAt: string;
    specialization : string,
    career_start_year : string,
    gender : string,
}

export const adminDoctorService = {
  async getDoctors(params? : DoctorQueryParams) {
    console.log(params)
    return await apiRequest('/admin/doctor',HTTP_METHOD.GET,null, params) as APIResponse<{doctors : Doctor[], totalCount : number}>
  }
}