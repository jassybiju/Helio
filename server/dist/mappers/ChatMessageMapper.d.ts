import { ChatMessage } from "#domain/entities/ChatMessage.js";
import type { ChatMessageRaw } from "#infrastructure/database/model/ChatMessageModel.js";
export declare class ChatMessageMapper {
    static toPersistance(chatMessage: ChatMessage): ChatMessageRaw;
    static toDomain(raw: ChatMessageRaw): ChatMessage;
}
//# sourceMappingURL=ChatMessageMapper.d.ts.map