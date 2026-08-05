import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class GetDoctorBlockSlotUseCase {
    _logger;
    _doctorRepo;
    _doctorBlockShiftRepo;
    constructor(_logger, _doctorRepo, _doctorBlockShiftRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._doctorBlockShiftRepo = _doctorBlockShiftRepo;
    }
    async execute(doctorId) {
        this._logger.info("Get Doctor Block Slot  attempt", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const blockShifts = await this._doctorBlockShiftRepo.findByDoctor(doctorId);
        return blockShifts;
    }
}
//# sourceMappingURL=GetDoctorBlockSlotUseCase.js.map