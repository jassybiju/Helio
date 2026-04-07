import { apiRequest } from "@/src/libs/axios.config";
import { PatientCompleteProfileFormData } from "../schemas/profile.schema";
import { HTTP_METHOD } from "@/src/types/API.types";

export const profileService = {
  completeProfile : (data : PatientCompleteProfileFormData) => {
    return apiRequest('/patient/profile/complete-profile', HTTP_METHOD.PATCH, data)
  }
}