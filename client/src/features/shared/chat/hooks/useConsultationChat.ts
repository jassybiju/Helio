import { useEffect } from "react";
import { ChatListType, ChatMessageType, ChatType } from "../types/chat.type";
import { socket } from "@/src/libs/socket";
import { USER_ROLES } from "@/src/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

type IncomingMessage = ChatMessageType & { chatSessionId: string };

export const useConsultationChat = ({
  activeSessionId,
  userType,
}: {
  activeSessionId: string | null;
  userType: USER_ROLES;
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleListUpdate = (message: IncomingMessage) => {
      queryClient.setQueryData(
        ["chat-list"],
        (
          old:
            | { data: { chats: { active: ChatListType["chats"]["active"] } } }
            | undefined,
        ) => {
          if (!old) return old;
          const { active } = old.data.chats;
          const chat = active.find((c) => c.id === message.chatSessionId);
          if (!chat) return old;

          const updatedChat = {
            ...chat,
            message: message.message,
            lastMessageAt: message.sendAt,
          };
          const rest = active.filter((c) => c.id !== message.chatSessionId);

          return {
            ...old,
            data: {
              ...old.data,
              chats: {
                ...old.data.chats,
                active: [updatedChat, ...rest],
              },
            },
          };
        },
      );
    };

    socket.on("chat:list-update", handleListUpdate);
    return () => {
      socket.off("chat:list-update", handleListUpdate);
    };
  }, [queryClient]); // no activeSessionId dependency — runs for the lifetime of this hook's owner

  useEffect(() => {
    if (!activeSessionId) return;

    socket.emit("chat:join-room", activeSessionId);

    const handleActiveChatMessage = (message: IncomingMessage) => {
      if (message.sendBy === userType) return; // ignore our own echo
      if (message.chatSessionId !== activeSessionId) return;

      queryClient.setQueryData(
        ["chat-data", activeSessionId],
        (old: { data: { chats: ChatType[] } } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              chats: [...old.data.chats, message],
            },
          };
        },
      );
    };

    socket.on("chat:send", handleActiveChatMessage);

    return () => {
      socket.off("chat:send", handleActiveChatMessage);
      socket.emit("chat:leave-chat", activeSessionId);
    };
  }, [activeSessionId, userType, queryClient]);
};