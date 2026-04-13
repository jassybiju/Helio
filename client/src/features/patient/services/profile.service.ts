import { apiRequest } from "@/src/libs/axios.config";
import { PatientCompleteProfileFormData } from "../auth/schemas/profile.schema";
import { HTTP_METHOD } from "@/src/types/API.types";
import { PatientView } from "../../admin/services/patient.service";

type PatientProfileType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  gender: "male" | "female" | "other" | null;
  dob: string | null;
  bloodGroup: string | null;
  phone: string | null;

  isVerified: boolean;
  isBlocked: boolean;

  createdAt: string;
  updatedAt: string;
};

export const patientProfileService = {
  completeProfile: (data: PatientCompleteProfileFormData) => {
    return apiRequest(
      "/patient/profile/complete-profile",
      HTTP_METHOD.PATCH,
      data,
    );
  },
  getProfile: () => {
    return apiRequest<PatientProfileType>("/patient/profile", HTTP_METHOD.GET);
  },
};
