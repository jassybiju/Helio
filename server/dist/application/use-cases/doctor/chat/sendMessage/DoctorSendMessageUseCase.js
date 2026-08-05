import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { ChatMessage } from "#domain/entities/ChatMessage.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorSendMessageUseCase {
    _logger;
    _doctorRepo;
    _chatSessionRepo;
    _chatMessageRepo;
    _idGenerator;
    _realTimeNotifier;
    _uow;
    constructor(_logger, _doctorRepo, _chatSessionRepo, _chatMessageRepo, _idGenerator, _realTimeNotifier, _uow) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._chatSessionRepo = _chatSessionRepo;
        this._chatMessageRepo = _chatMessageRepo;
        this._idGenerator = _idGenerator;
        this._realTimeNotifier = _realTimeNotifier;
        this._uow = _uow;
    }
    /**
     * sends Message to the patient
     * @param doctorId
     * @param chatSessionId
     * @param content
     * @returns
     */
    async execute(doctorId, chatSessionId, content) {
        this._logger.info("Doctor Send Message Attempt", {
            doctorId,
            chatSessionId,
            content,
        });
        return this._uow.execute(async (session, afterCommit) => {
            const doctorRepo = this._doctorRepo.withSession(session);
            const chatMessageRepo = this._chatMessageRepo.withSession(session);
            const chatSessionRepo = this._chatSessionRepo.withSession(session);
            const doctor = await doctorRepo.findById(doctorId);
            if (!doctor) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const chatSession = await chatSessionRepo.findById(chatSessionId);
            if (!chatSession) {
                throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
            }
            const chatMessageId = this._idGenerator.generate(process.env.MESSAGE_PREFIX);
            const chatMessage = ChatMessage.create(chatMessageId, chatSession.id, doctor.id, USER_ROLES.DOCTOR, content);
            await chatMessageRepo.create(chatMessage);
            afterCommit(async () => {
                const payload = {
                    message: chatMessage.message,
                    id: chatMessage.id,
                    sendBy: chatMessage.senderRole,
                    sendAt: chatMessage.createdAt,
                    chatSessionId: chatSession.id,
                };
                this._realTimeNotifier.emitToRoom(`chat:${chatSession.id}`, "chat:send", { message: chatMessage.message });
                this._realTimeNotifier.emitToRoom(`user:${USER_ROLES.PATIENT}:${chatSession.patientId}`, "chat:list-update", payload);
            });
            return {
                id: chatMessage.id,
                message: chatMessage.message,
                sendBy: chatMessage.senderRole,
                sendAt: chatMessage.createdAt,
            };
        });
    }
}
//# sourceMappingURL=DoctorSendMessageUseCase.js.map