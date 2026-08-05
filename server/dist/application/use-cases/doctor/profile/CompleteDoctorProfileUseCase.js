import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class CompleteDoctorProfileUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(userId, input) {
        this._logger.info("Complete Doctor Profile Attempt");
        const { gender, specialization, career_start_year, document } = input;
        const doctor = await this._doctorRepo.findById(userId);
        if (!doctor) {
            throw new AppError("Doctor not found", HTTPStatus.NOT_FOUND);
        }
        if (doctor.isProfileComplete()) {
            throw new AppError("Profile is already complete", HTTPStatus.BAD_REQUEST);
        }
        const documentKey = await this._fileUpload.upload(document, true);
        doctor.completeProfile({
            gender: gender,
            specialization,
            careerStartYear: career_start_year,
            documentKey,
        });
        await this._doctorRepo.update(doctor);
        this._logger.info("Doctor profile completed", { userId });
        return {
            isProfileComplete: doctor.isProfileComplete(),
        };
    }
}
//# sourceMappingURL=CompleteDoctorProfileUseCase.js.map