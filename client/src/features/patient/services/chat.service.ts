import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import {
  ChatListType,
  ChatType,
  SendeeType,
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
    ) as Promise<APIResponse<IPatientGetChat>>;
  },
  sendMessage(id: string, content: string) {
    return apiRequest(API_ENDPOINT.PATIENT.CHAT.ID(id), HTTP_METHOD.POST, {
      content,
    });
  },
};

export interface IPatientGetChat {
  chats: ChatType[];
  patient: SendeeType;
  sessionId: string;
}
