import { useQuery } from "@tanstack/react-query"
import { patientChatService } from "../../../services/chat.service"

export const usePatientGetChatQuery = (id : string | null) => {
  return useQuery({
    queryKey : ['chat-data',id],
    queryFn : ()=>patientChatService.getChat(id!),
    enabled : !!id
  })
}