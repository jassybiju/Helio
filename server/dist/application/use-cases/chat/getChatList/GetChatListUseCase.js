import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
export class GetChatListUseCase {
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
    async execute(userId, userType) {
        this._logger.info("User Get chat list attempt", { userId });
        let sender;
        if (userType === USER_ROLES.DOCTOR) {
            sender = await this._doctorRepo.findById(userId);
        }
        else if (userType === USER_ROLES.PATIENT) {
            sender = await this._patientRepo.findById(userId);
        }
        if (!sender) {
            throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
        }
        const chatSessions = await this._chatSessionRepo.findManyByUserIdAndType(sender.id, userType);
        const result = {
            expired: [],
            active: [],
        };
        for (const session of chatSessions) {
            const lastMessage = (await this._chatMessageRepo.findLastMessageWithSessionId(session.id));
            const sendee = userType === USER_ROLES.DOCTOR
                ? await this._patientRepo.findById(session.patientId)
                : await this._doctorRepo.findById(session.doctorId);
            const diffMs = session.expiresAt.getTime() - new Date().getTime();
            const absDiffMs = Math.abs(diffMs);
            const days = Math.floor(absDiffMs / 86400000);
            const remainingMs = absDiffMs % 86400000;
            const remainingMinutes = Math.floor(remainingMs / 60000);
            const expiresIn = days > 0
                ? `${days} days`
                : remainingMinutes > 60
                    ? `${Math.floor(remainingMinutes / 60)} hours`
                    : `${remainingMinutes} mins`;
            if (diffMs > 0) {
                result.active.push({
                    id: session.id,
                    name: sendee?.fullName ?? "Unknown User",
                    profilePic: sendee?.profilePicKey
                        ? this._fileUpload.getFileUrl(sendee.profilePicKey)
                        : null,
                    message: lastMessage?.message,
                    expiresIn,
                });
            }
            else {
                result.expired.push({
                    id: session.id,
                    name: sendee?.fullName ?? "Unknown User",
                    profilePic: sendee?.profilePicKey
                        ? this._fileUpload.getFileUrl(sendee.profilePicKey)
                        : null,
                    message: lastMessage?.message,
                    expiresIn,
                });
            }
        }
        return { chats: result };
    }
}
//# sourceMappingURL=GetChatListUseCase.js.map