import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class GetChatUseCase {
    _logger;
    _doctorRepo;
    _patientRepo;
    _chatSessionRepo;
    _chatMessageRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _patientRepo, _chatSessionRepo, _chatMessageRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._patientRepo = _patientRepo;
        this._chatSessionRepo = _chatSessionRepo;
        this._chatMessageRepo = _chatMessageRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(userId, chatSessionId, userRole) {
        this._logger.info("User Get Chat Attempt", { userId, chatSessionId });
        let sender;
        if (userRole === USER_ROLES.DOCTOR) {
            sender = await this._doctorRepo.findById(userId);
        }
        else if (userRole === USER_ROLES.PATIENT) {
            sender = await this._patientRepo.findById(userId);
        }
        if (!sender) {
            throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
        }
        const chatSession = await this._chatSessionRepo.findById(chatSessionId);
        if (!chatSession) {
            throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
        }
        let sendee;
        if (userRole === USER_ROLES.PATIENT) {
            sendee = await this._doctorRepo.findById(chatSession.doctorId);
        }
        else if (userRole === USER_ROLES.DOCTOR) {
            sendee = await this._patientRepo.findById(chatSession.patientId);
        }
        if (!sendee) {
            throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
        }
        const chats = await this._chatMessageRepo.findMessagesWithSessionId(chatSession.id);
        return {
            chats: chats.map((chat) => ({
                id: chat.id,
                message: chat.message,
                sendBy: chat.senderRole,
                sendAt: chat.createdAt,
            })),
            sendee: {
                id: sendee.id,
                name: sendee.fullName,
                profilePic: sendee.profilePicKey
                    ? this._fileUpload.getFileUrl(sendee.profilePicKey)
                    : null,
            },
            isExpired: chatSession.isExpired(),
            sessionId: chatSession.id,
        };
    }
}
//# sourceMappingURL=GetChatUseCase.js.map