import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorUpdateProfilePictureUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(doctorId, document) {
        this._logger.info("Doctor Update Profile Pic", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const documentKey = await this._fileUpload.upload(document);
        doctor.updateProfilePic(documentKey);
        await this._doctorRepo.update(doctor);
    }
}
//# sourceMappingURL=DoctorUpdateProfilePictureUseCase.js.map