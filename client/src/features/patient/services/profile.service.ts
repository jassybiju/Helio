import { apiRequest } from "@/src/libs/axios.config";
import { PatientCompleteProfileFormData } from "../auth/schemas/profile.schema";
import { HTTP_METHOD } from "@/src/types/API.types";
import { UpdatePatientFormData } from "../dashboard/schemas/settings.schema";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";

export type PatientProfileType = {
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

  allergens: Array<{
    _id: string;
    name: string;
    severity: "LOW" | "MEDIUM" | "HIGH";
    createdAt: Date;
  }>;
  conditions: Array<{ _id: string; name: string; createdAt: Date }>;

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
  addAllergen: (data: { allergen: string; severity: string }) => {
    return apiRequest("/patient/profile/allergen", HTTP_METHOD.POST, data);
  },
  removeAllergen: (id: string) => {
    return apiRequest("/patient/profile/allergen/" + id, HTTP_METHOD.DELETE);
  },
  addCondition: (condition: string) => {
    return apiRequest("/patient/profile/condition", HTTP_METHOD.POST, {
      condition,
    });
  },
  removeCondition: (id: string) => {
    return apiRequest("/patient/profile/condition/" + id, HTTP_METHOD.DELETE);
  },
  changePassword: ({
    newPassword,
    oldPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }) => {
    return apiRequest("/patient/profile/change-password/", HTTP_METHOD.PATCH, {
      newPassword,
      oldPassword,
    });
  },
  updatePatient: (data: UpdatePatientFormData) => {
    return apiRequest(API_ENDPOINT.PATIENT.PROFILE.I, HTTP_METHOD.PUT, data);
  },
};
