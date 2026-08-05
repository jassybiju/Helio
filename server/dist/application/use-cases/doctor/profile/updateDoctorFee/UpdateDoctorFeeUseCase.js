import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class UpdateDoctorFeeUseCase {
    _logger;
    _doctorRepo;
    constructor(_logger, _doctorRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
    }
    async execute(doctorId, onlineFee, clinicFee) {
        this._logger.info("Doctor Update Fee attempt", {
            doctorId,
            onlineFee,
            clinicFee,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        doctor.updateFee({ onlineFee, clinicFee });
        await this._doctorRepo.update(doctor);
    }
}
//# sourceMappingURL=UpdateDoctorFeeUseCase.js.map