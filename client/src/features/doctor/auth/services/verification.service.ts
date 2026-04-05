import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";

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
};
