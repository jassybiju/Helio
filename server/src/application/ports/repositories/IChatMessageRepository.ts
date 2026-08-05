import type { ChatMessage } from "#domain/entities/ChatMessage.js";
import type { ClientSession } from "mongoose";

export interface IChatMessageRepository {
  withSession(session: ClientSession): IChatMessageRepository;
  findById(id: string): Promise<ChatMessage | null>;
  create(chatMessage: ChatMessage): Promise<void>;
  update(chatMessage: ChatMessage): Promise<void>;
  delete(id: string): Promise<void>;

  findLastMessageWithSessionId(
    chatSessionId: string
  ): Promise<ChatMessage | null>;

  findMessagesWithSessionId(chatSessionId: string): Promise<ChatMessage[]>;
}
