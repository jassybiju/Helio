import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { DoctorVerificationFormData } from "../schema/verification.schema";

type VerificationDetails = {
  verification_status: string;
  document_url: string;
  rejection_reason: string | null;
  verification_history: (Omit<VerificationDetails, "verification_history"> & {
    actedAt: string;
  })[];
};

export const verificationService = {
  getVerificationDetails() {
    return apiRequest("/doctor/verification", HTTP_METHOD.GET) as Promise<
      APIResponse<VerificationDetails>
    >;
  },
  resubmit(data: DoctorVerificationFormData) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });
    return apiRequest(
      "/doctor/verification/resubmit",
      HTTP_METHOD.PATCH,
      formData,
    );
  },
};
