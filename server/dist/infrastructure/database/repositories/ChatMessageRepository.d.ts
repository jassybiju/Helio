import { ChatMessage } from "#domain/entities/ChatMessage.js";
import { BaseRepository } from "./BaseRepository.js";
import { type ChatMessageRaw } from "../model/ChatMessageModel.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession } from "mongoose";
import type { IChatMessageRepository } from "#application/ports/repositories/IChatMessageRepository.js";
export declare class ChatMessageRepository extends BaseRepository<ChatMessage, ChatMessageRaw> implements IChatMessageRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): IChatMessageRepository;
    findMessagesWithSessionId(chatSessionId: string): Promise<ChatMessage[]>;
    findById(id: string): Promise<ChatMessage | null>;
    findLastMessageWithSessionId(chatSessionId: string): Promise<ChatMessage | null>;
    create(chatMessage: ChatMessage): Promise<void>;
    update(chatMessage: ChatMessage): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ChatMessageRepository.d.ts.map