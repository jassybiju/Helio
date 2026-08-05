import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
export class DoctorGetChatListUseCase {
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
    async execute(doctorId) {
        this._logger.info("Doctor Get chat list attempt", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const chatSessions = await this._chatSessionRepo.findManyByDoctorId(doctor.id);
        const result = {
            expired: [],
            active: [],
        };
        for (const session of chatSessions) {
            const lastMessage = (await this._chatMessageRepo.findLastMessageWithSessionId(session.id));
            const patient = (await this._patientRepo.findById(session.patientId));
            const diffMs = Math.abs(session.expiresAt.getTime() - new Date().getTime());
            const days = Math.floor(diffMs / 86400000);
            const remainingMs = diffMs % 86400000;
            const remainingMinutes = Math.floor(remainingMs / 60000);
            const expiresIn = days > 0
                ? `${days} days`
                : remainingMinutes > 60
                    ? `${Math.floor(remainingMinutes / 60)} hours`
                    : `${remainingMinutes} mins`;
            result.active.push({
                id: session.id,
                name: patient?.fullName,
                profilePic: "",
                message: lastMessage?.message,
                expiresIn,
            });
        }
        return { chats: result };
    }
}
//# sourceMappingURL=DoctorGetChatListUseCase.js.map