import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { GetDoctorProfileMapper } from "./GetDoctorProfileMapper.js";
export class GetDoctorProfileUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(doctorId) {
        this._logger.info("Get Doctor Profile attempt", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const profilePic = doctor.profilePicKey
            ? this._fileUpload.getFileUrl(doctor.profilePicKey)
            : null;
        return GetDoctorProfileMapper.toDto(doctor, profilePic);
    }
}
//# sourceMappingURL=GetDoctorProfileUseCase.js.map