import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { GetPatientProfileMapper } from "./GetPatientProfileMapper.js";
export class GetPatientProfileUseCase {
    _logger;
    _patientRepo;
    _fileUpload;
    constructor(_logger, _patientRepo, _fileUpload) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(patientId) {
        this._logger.info("Get Patient Profile Attempt", { patientId });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const profilePic = patient.profilePicKey
            ? this._fileUpload.getFileUrl(patient.profilePicKey)
            : null;
        return GetPatientProfileMapper.toDto(patient, profilePic);
    }
}
//# sourceMappingURL=GetPatientProfileUseCase.js.map