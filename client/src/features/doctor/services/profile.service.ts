import { apiRequest } from "@/src/libs/axios.config";
import { DoctorCompleteProfileFormData } from "../auth/schema/profile.schema";
import { HTTP_METHOD } from "@/src/types/API.types";

type DoctorProfileType = {
    id: string;
  fullName: string;
  email: string;
  phone: string | null;
  specialization: string;
  bio: string | null;
  yearsOfExperience: number | null;
  onlineFee: number | null;
  clinicFee: number | null;
}

export const doctorProfileService = {
  completeProfile:  (data: DoctorCompleteProfileFormData) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });
    return apiRequest("/doctor/profile/complete-profile", "PATCH", formData);
  },
  getProfile : () => {
    return apiRequest<DoctorProfileType>('/doctor/profile', HTTP_METHOD.GET)
  },
  updateFee : (data : {onlineFee : number, clinicFee : number}) => {
    return apiRequest<DoctorProfileType>('/doctor/profile/fee', HTTP_METHOD.PATCH, data)
  }
};
