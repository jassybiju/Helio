import { ChatMessage } from "#domain/entities/ChatMessage.js";
import { BaseRepository } from "./BaseRepository.js";
import { chatMessageModel, } from "../model/ChatMessageModel.js";
import { ChatMessageMapper } from "../../../mappers/ChatMessageMapper.js";
export class ChatMessageRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(chatMessageModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new ChatMessageRepository(this._logger, session);
    }
    findMessagesWithSessionId(chatSessionId) {
        return super.find({ chat_session_id: chatSessionId }, { sort: { created_at: 1 } }, ChatMessageMapper.toDomain);
    }
    findById(id) {
        return super.findById(id, ChatMessageMapper.toDomain);
    }
    findLastMessageWithSessionId(chatSessionId) {
        return super.findOne({ chat_session_id: chatSessionId }, ChatMessageMapper.toDomain, {
            sort: { created_at: -1 },
        });
    }
    async create(chatMessage) {
        await super.create(chatMessage, ChatMessageMapper.toPersistance);
    }
    async update(chatMessage) {
        await super.update(chatMessage, chatMessage.id, ChatMessageMapper.toPersistance);
    }
    async delete(id) {
        await super.delete(id);
    }
}
//# sourceMappingURL=ChatMessageRepository.js.map