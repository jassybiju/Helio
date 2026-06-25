import { useQuery } from "@tanstack/react-query"
import { doctorChatService } from "../../../services/chat.service"

export const useDoctorGetChatQuery = (id : string | null) => {
  return useQuery({
    queryKey : ['chat-data',id],
    queryFn : ()=>doctorChatService.getChat(id!),
    enabled : !!id
  })
}