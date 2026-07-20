import { useState } from "react";
import { USER_ROLES } from "@/src/types/user.types";
import { useConsultationChat } from "@/src/features/shared/chat/hooks/useConsultationChat";
import {
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { ChatListType, ChatMessageType, ChatType } from "../types/chat.type";
import { APIResponse } from "@/src/types/API.types";

export function useConsultationChatPage({
  userType,
  useChatListQuery,
  useChatQuery,
  useSendMessageMutation,
}: {
  userType: USER_ROLES;
  useChatListQuery: () => UseQueryResult<APIResponse<ChatListType>>;
  useChatQuery: (
    id: string | null,
  ) => UseQueryResult<APIResponse<ChatType>>;
  useSendMessageMutation: (
    id: string | null,
  ) => UseMutationResult<
    APIResponse<{ id: string; message: string; sendBy: string }>,
    Error,
    string,
    unknown
  >;
}) {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const { data: chatListRes } = useChatListQuery();
  const { data: chatRes } = useChatQuery(activeSessionId);
  const { mutate: sendMessage } = useSendMessageMutation(activeSessionId);

  useConsultationChat({ activeSessionId, userType });

  const queryClient = useQueryClient();

  const handleSendMessage = (message: string) => {
    const tempId = crypto.randomUUID();
    let prevMessage: string | null = null;
    // SENDING MESSAGE
    if (message) {
      // UPDATE WITH MOCK DATA
      queryClient.setQueryData(
        ["chat-data", activeSessionId],
        (old: { data: { chats: ChatType[] } } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              chats: [
                ...old.data.chats,
                { id: tempId, message, sendBy: userType, status: "sending" },
              ],
            },
          };
        },
      );
      queryClient.setQueryData(
        ["chat-list"],
        (old: { data: ChatListType } | undefined) => {
          if (!old) return old;
          prevMessage = old.data.chats.active.find(
            (chat) => chat.id === activeSessionId,
          )?.message!;
          return {
            ...old,
            data: {
              ...old.data,
              chats: {
                ...old.data.chats,
                active: old.data.chats.active.map((chat) =>
                  chat.id === activeSessionId
                    ? { ...chat, message: message }
                    : chat,
                ),
              },
            },
          };
        },
      );

      sendMessage(message, {
        // ONSUCCESS MODIFY THE MOCK DATA WITH ACTUAL
        onSuccess(data) {
          queryClient.setQueryData(
            ["chat-data", activeSessionId],
            (old: { data: { chats: ChatMessageType[] } } | undefined) => {
              if (!old) return old;
              return {
                ...old,
                data: {
                  ...old.data,
                  chats: old.data.chats.map((chat) =>
                    chat.id === tempId ? data.data : chat,
                  ),
                },
              };
            },
          );
        },
        // ONERROR REMOVE THE MOCK DATA
        onError() {
          queryClient.setQueryData(
            ["chat-data", activeSessionId],
            (old: { data: { chats: ChatMessageType[] } } | undefined) => {
              if (!old) return old;
              return {
                ...old,
                data: {
                  ...old.data,
                  chats: old.data.chats.filter((m) => m.id !== tempId),
                },
              };
            },
          );

          queryClient.setQueryData(
            ["chat-list"],
            (old: { data: ChatListType } | undefined) => {
              if (!old) return old;
              return {
                ...old,
                data: {
                  ...old.data,
                  chats: {
                    ...old.data.chats,
                    active: old.data.chats.active.map((chat) =>
                      chat.id === activeSessionId
                        ? { ...chat, message: prevMessage }
                        : chat,
                    ),
                  },
                },
              };
            },
          );

          prevMessage = null;
        },
      });
    }
  };

  return {
    chatList: chatListRes?.data,
    chatData: chatRes?.data?.chats,
    sendeeData: chatRes?.data?.sendee,
    activeSessionId,
    setActiveSessionId,
    isExpired: chatRes?.data?.isExpired,
    onSendMessage: handleSendMessage,
  };
}
