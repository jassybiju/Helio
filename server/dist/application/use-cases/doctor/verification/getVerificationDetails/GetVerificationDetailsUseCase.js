import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class GetVerificationDetailsUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(userId) {
        this._logger.info("Get Doctor Verification Details Attempt", { userId });
        const doctor = await this._doctorRepo.findById(userId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        let document_url = doctor.documentKey
            ? this._fileUpload.getFileUrl(doctor.documentKey, true)
            : "";
        return {
            verification_status: doctor.verificationStatus,
            document_url: document_url,
            rejection_reason: doctor.rejectionReason ?? "",
            verification_history: doctor.verificationHistory.map((doc) => ({
                verification_status: doc.status,
                rejection_reason: doc.reason ?? "",
                actedAt: doc.actedAt.toLocaleString(),
                document_url: doc.documentKey
                    ? this._fileUpload.getFileUrl(doc.documentKey, true)
                    : "",
            })),
            userId: doctor.id,
        };
    }
}
//# sourceMappingURL=GetVerificationDetailsUseCase.js.map