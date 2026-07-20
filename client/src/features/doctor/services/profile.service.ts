import { apiRequest } from "@/src/libs/axios.config";
import { DoctorCompleteProfileFormData } from "../auth/schema/profile.schema";
import { HTTP_METHOD } from "@/src/types/API.types";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { UpdateDoctorFormData } from "../dashboard/schemas/settings.schema";

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
  profilePic : string | null
};

export const doctorProfileService = {
  completeProfile: (data: DoctorCompleteProfileFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });
    return apiRequest(API_ENDPOINT.DOCTOR.PROFILE.COMPLETE, "PATCH", formData);
  },
  getProfile: () => {
    return apiRequest<DoctorProfileType>(
      API_ENDPOINT.DOCTOR.PROFILE.BASE,
      HTTP_METHOD.GET,
    );
  },
  updateFee: (data: { onlineFee: number; clinicFee: number }) => {
    return apiRequest<DoctorProfileType>(
      API_ENDPOINT.DOCTOR.PROFILE.FEE,
      HTTP_METHOD.PATCH,
      data,
    );
  },
  updateProfile: (data: UpdateDoctorFormData) => {
    return apiRequest(API_ENDPOINT.DOCTOR.PROFILE.BASE, HTTP_METHOD.PUT, data);
  },
  changePassword: ({
    newPassword,
    oldPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }) => {
    return apiRequest("/doctor/profile/change-password/", HTTP_METHOD.PATCH, {
      newPassword,
      oldPassword,
    });
  },
  updateProfilePic : (data : Blob) => {
    const formData = new FormData()
    formData.append('avatar', data)

    return apiRequest('/doctor/profile/picture',HTTP_METHOD.PATCH, formData)
  }
};
