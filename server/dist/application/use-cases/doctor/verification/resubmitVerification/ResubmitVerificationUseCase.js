import { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import { Doctor } from "#domain/entities/Doctor.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ResubmitVerificationUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(doctorId, input) {
        const { additionalInfo, document } = input;
        this._logger.info("Resubmit Verification Attempt", {
            doctorId,
            additionalInfo,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const documentKey = await this._fileUpload.upload(document, true);
        if (Doctor.isValidTransistion(doctor.verificationStatus, DOCTOR_VERIFICATION_STATUS.PENDING)) {
            doctor.resubmit(documentKey, additionalInfo);
        }
        await this._doctorRepo.update(doctor);
    }
}
//# sourceMappingURL=ResubmitVerificationUseCase.js.map