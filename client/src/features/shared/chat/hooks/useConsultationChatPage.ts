import { useState } from "react";
import { USER_ROLES } from "@/src/types/user.types";
import { useConsultationChat } from "@/src/features/shared/chat/hooks/useConsultationChat";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ChatType } from "../types/chat.type";
import { APIResponse } from "@/src/types/API.types";

export function useConsultationChatPage({
  userType,
  useChatListQuery,
  useChatQuery,
  useSendMessageMutation,
}: {
  userType: USER_ROLES;
  useChatListQuery: () => { data: unknown };
  useChatQuery: (id: string | null) => { data: unknown };
  useSendMessageMutation: (
    id: string | null,
  ) => UseMutationResult<APIResponse<{ id: string; message: string; sendBy: string }>>;
}) {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const { data: chatListRes } = useChatListQuery();
  const { data: chatRes } = useChatQuery(activeSessionId);
  const { mutate: sendMessage } = useSendMessageMutation(activeSessionId);

  useConsultationChat({ activeSessionId, userType });

  const queryCleint = useQueryClient();

  const handleSendMessage = (message: string) => {
    if (message) {
      sendMessage(message, {
        onSuccess(data) {
          console.log(data);
          queryCleint.setQueryData(
            ["chat-data", activeSessionId],
            (old: { data: { chats: ChatType[] } } | undefined) => {
              if (!old) return old;
              console.log(old,data)
              return {
                ...old,
                data: {
                  ...old.data,
                  chats : [
                    ...old.data.chats,
                    data.data
                  ],
                },
              };
            },
          );
        },
      });
    }
  };

  return {
    chatList: chatListRes?.data,
    chatData: chatRes?.data?.chats,
    sendeeData: chatRes?.data?.patient ?? chatRes?.data?.doctor,
    activeSessionId,
    setActiveSessionId,
    onSendMessage: handleSendMessage,
  };
}
