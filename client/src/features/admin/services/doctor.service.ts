import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"
import { DoctorQueryParams } from "../doctors/hooks/useDoctorsQuery";
import { DOCTOR_STATUS } from "@/src/types/user.types";

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

export type DoctorView = {
  id: string;
  email: string;
  fullName: string;

  gender: 'male' | 'female' | 'other' | null;
  specialization: string | null;
  careerStartYear: number | null;
  bio: string | null;

  verificationStatus: DOCTOR_STATUS;
  rejectionReason: string | null;

  documentUrl: string | null;
additionalInfo : string | null,
  verificationHistory: {
    status: DOCTOR_STATUS;
    reason: string | null;
    documentUrl: string | null;
    actedAt: string;
  }[];

  onlineFee: number | null;
  clinicFee: number | null;

  isVerified: boolean;
  isBlocked: boolean;

  createdAt: string;
  updatedAt: string;
};

export const adminDoctorService = {
  async getDoctors(params? : DoctorQueryParams) {
    console.log(params)
    return await apiRequest('/admin/doctor',HTTP_METHOD.GET,null, params) as APIResponse<{doctors : Doctor[], totalCount : number}>
  },
   getDoctor(id : string) {
    return apiRequest('/admin/doctor/'+id,HTTP_METHOD.GET,) as Promise<APIResponse<DoctorView>>
  },
   togglePatient(userId: string){
    return  apiRequest(`/admin/doctor/${userId}/status`,HTTP_METHOD.PATCH)

  },
  doctorApproval(userId : string,{verification_status, rejection_reason = null} : {verification_status : DOCTOR_STATUS, rejection_reason? : string |null }) {
    console.log(userId,verification_status, rejection_reason)
    return apiRequest(`/admin/doctor/${userId}/approval-status`,HTTP_METHOD.PATCH, {verification_status, rejection_reason})
  }
}