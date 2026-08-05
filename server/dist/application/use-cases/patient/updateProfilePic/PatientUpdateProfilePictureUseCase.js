import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class PatientUpdateProfilePictureUseCase {
    _logger;
    _patientRepo;
    _fileUpload;
    constructor(_logger, _patientRepo, _fileUpload) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(patientId, document) {
        this._logger.info("Patient Update Profile Pic", { patientId });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        const documentKey = await this._fileUpload.upload(document);
        patient.updateProfilePic(documentKey);
        await this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=PatientUpdateProfilePictureUseCase.js.map