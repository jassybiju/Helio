import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import {
  ChatListType,
  ChatType,
} from "../../shared/chat/types/chat.type";

export const patientChatService = {
  getChatList() {
    return apiRequest(
      API_ENDPOINT.PATIENT.CHAT.BASE,
      HTTP_METHOD.GET,
    ) as Promise<APIResponse<ChatListType>>;
  },
  getChat(id: string) {
    return apiRequest(
      API_ENDPOINT.PATIENT.CHAT.ID(id),
      HTTP_METHOD.GET,
    ) as Promise<APIResponse<ChatType>>;
  },
  sendMessage(id: string, content: string) {
    return apiRequest(API_ENDPOINT.PATIENT.CHAT.ID(id), HTTP_METHOD.POST, {
      content,
    }) as Promise<APIResponse<{id : string,  message : string, sendBy : string}>>
  },
};

