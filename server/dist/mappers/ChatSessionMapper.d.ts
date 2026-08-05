import { ChatSession } from "#domain/entities/ChatSession.js";
import type { ChatSessionRaw } from "#infrastructure/database/model/ChatSessionModel.js";
export declare class ChatSessionMapper {
    static toDomain(raw: ChatSessionRaw): ChatSession;
    static toPersistance(chatSession: ChatSession): ChatSessionRaw;
}
//# sourceMappingURL=ChatSessionMapper.d.ts.map