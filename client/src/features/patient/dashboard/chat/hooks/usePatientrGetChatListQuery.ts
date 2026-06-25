import { useQuery } from "@tanstack/react-query"
import {  patientChatService } from "../../../services/chat.service"

export const usePatientGetChatListQuery = () => {
  return useQuery({
    queryKey : ['chat-list'],
    queryFn : patientChatService.getChatList
  })
}