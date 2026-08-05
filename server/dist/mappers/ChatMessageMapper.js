import { ChatMessage } from "#domain/entities/ChatMessage.js";
export class ChatMessageMapper {
    static toPersistance(chatMessage) {
        return {
            _id: chatMessage.id,
            chat_session_id: chatMessage.chatSessionId,
            sender_id: chatMessage.senderId,
            sender_role: chatMessage.senderRole,
            message: chatMessage.message,
            created_at: chatMessage.createdAt,
            read_at: chatMessage.readAt,
            is_deleted: false,
        };
    }
    static toDomain(raw) {
        return new ChatMessage(raw._id, raw.chat_session_id, raw.sender_id, raw.sender_role, raw.message, new Date(raw.created_at), new Date(raw.read_at) ?? null);
    }
}
//# sourceMappingURL=ChatMessageMapper.js.map