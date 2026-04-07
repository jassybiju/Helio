import { apiRequest } from "@/src/libs/axios.config";
import { DoctorCompleteProfileFormData } from "../schema/profile.schema";

export const profileService = {
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
};
