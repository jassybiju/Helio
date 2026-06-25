import { useState } from "react";
import { USER_ROLES } from "@/src/types/user.types";
import { useConsultationChat } from "@/src/features/shared/chat/hooks/useConsultationChat";

export function useConsultationChatPage({
  userType,
  useChatListQuery,
  useChatQuery,
  useSendMessageMutation,
}: {
  userType: USER_ROLES;
  useChatListQuery: () => { data: unknown };
  useChatQuery: (id: string | null) => { data: unknown };
  useSendMessageMutation: (id: string | null) => { mutate: (message : string) => void };
}) {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const { data: chatListRes } = useChatListQuery();
  const { data: chatRes } = useChatQuery(activeSessionId);
  const { mutate: sendMessage } = useSendMessageMutation(activeSessionId);

  useConsultationChat({ activeSessionId, userType,  });

  return {
    chatList: chatListRes?.data,
    chatData: chatRes?.data?.chats,
    sendeeData: chatRes?.data?.patient ?? chatRes?.data?.doctor,
    activeSessionId,
    setActiveSessionId,
    onSendMessage: sendMessage,
  };
}