import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
export class DoctorGetChatUseCase {
    _logger;
    _doctorRepo;
    _patientRepo;
    _chatSessionRepo;
    _chatMessageRepo;
    constructor(_logger, _doctorRepo, _patientRepo, _chatSessionRepo, _chatMessageRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._patientRepo = _patientRepo;
        this._chatSessionRepo = _chatSessionRepo;
        this._chatMessageRepo = _chatMessageRepo;
    }
    async execute(doctorId, chatSessionId) {
        this._logger.info("Doctor Get Chat Attempt", { doctorId, chatSessionId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const chatSession = await this._chatSessionRepo.findById(chatSessionId);
        if (!chatSession) {
            throw new NotFoundError(MESSAGE.CHAT_SESSION_NOT_FOUND);
        }
        const patient = await this._patientRepo.findById(chatSession.patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        const chats = await this._chatMessageRepo.findMessagesWithSessionId(chatSession.id);
        return {
            chats: chats.map((chat) => ({
                id: chat.id,
                message: chat.message,
                sendBy: chat.senderRole,
                sendAt: chat.createdAt,
            })),
            patient: {
                id: patient.id,
                name: patient.fullName,
                profilePic: "",
            },
            sessionId: chatSession.id,
        };
    }
}
//# sourceMappingURL=DoctorGetChatUseCase.js.map