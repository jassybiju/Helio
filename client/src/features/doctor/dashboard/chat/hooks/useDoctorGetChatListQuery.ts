import { useQuery } from "@tanstack/react-query"
import { doctorChatService } from "../../../services/chat.service"

export const useDoctorGetChatListQuery = () => {
  return useQuery({
    queryKey : ['chat-list'],
    queryFn : doctorChatService.getChatList
  })
}