import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";

export const patientAiService = {
  chat: ({
    message,
    conversationId,
  }: {
    message: string;
    conversationId: string | null;
  }) => {
    return apiRequest(API_ENDPOINT.PATIENT.AI.CHAT, HTTP_METHOD.POST, {
      message,
      conversationId,
    }) as Promise<APIResponse<{message : string, conversationId : string}>>;
  },
};
