import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class UpdateDoctorProfileUseCase {
    _logger;
    _doctorRepo;
    constructor(_logger, _doctorRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
    }
    async execute(input) {
        this._logger.info("Doctor Profile Update attempt", input);
        const doctor = await this._doctorRepo.findById(input.doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        doctor.updateProfile({
            fullName: input.fullName,
            specialization: input.specialization,
            bio: input.bio,
        });
        await this._doctorRepo.update(doctor);
    }
}
//# sourceMappingURL=UpdateDoctorProfileUseCase.js.map