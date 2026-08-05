import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ToggleBlockDoctorUseCase {
    _logger;
    _doctorRepo;
    constructor(_logger, _doctorRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
    }
    async execute(userId) {
        this._logger.info("Toggle Block doctor attempt", { userId });
        const doctor = await this._doctorRepo.findById(userId);
        if (!doctor) {
            throw new AppError("Doctor Not found", HTTPStatus.NOT_FOUND);
        }
        if (!doctor.isProfileComplete()) {
            throw new AppError("Doctor Profile not completed", HTTPStatus.BAD_REQUEST);
        }
        doctor.toogleBlockStatus();
        await this._doctorRepo.update(doctor);
    }
}
//# sourceMappingURL=ToggleBlockDoctorUseCase.js.map