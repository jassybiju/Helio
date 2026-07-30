import { usePatientGetChatListQuery } from "./usePatientrGetChatListQuery";
import { usePatientGetChatQuery } from "./usePatientGetChatQuery";
import { usePatientSendMessageMutation } from "./usePatientSendMessageMutation";
import { useConsultationChatPage } from "@/src/features/shared/chat/hooks/useConsultationChatPage";
import { USER_ROLES } from "@/src/types/user.types";

export const usePatientChat = (id : string | null) => {
  return useConsultationChatPage({
    activeSessionId : id,
    userType: USER_ROLES.PATIENT,
    useChatListQuery: usePatientGetChatListQuery,
    useChatQuery: usePatientGetChatQuery,
    useSendMessageMutation: usePatientSendMessageMutation,
  });
};
