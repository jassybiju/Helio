import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import {
  ChatListType,
  ChatType,
  SendeeType,
} from "../../shared/chat/types/chat.type";

export const doctorChatService = {
  getChatList() {
    return apiRequest(
      API_ENDPOINT.DOCTOR.CHAT.BASE,
      HTTP_METHOD.GET,
    ) as Promise<APIResponse<ChatListType>>;
  },
  getChat(id: string) {
    return apiRequest(
      API_ENDPOINT.DOCTOR.CHAT.ID(id),
      HTTP_METHOD.GET,
    ) as Promise<APIResponse<IDoctorGetChat>>;
  },
  sendMessage(id: string, content: string) {
    return apiRequest(API_ENDPOINT.DOCTOR.CHAT.ID(id), HTTP_METHOD.POST, {
      content,
    }) as    Promise<APIResponse<{ id: string; message: string; sendBy: string }>>
;
  },
};

export interface IDoctorGetChat {
  chats: ChatType[];
  patient: SendeeType;
  sessionId: string;
}
