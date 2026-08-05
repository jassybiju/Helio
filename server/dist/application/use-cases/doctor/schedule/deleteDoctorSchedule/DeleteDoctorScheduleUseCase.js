import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class DeleteDoctorScheduleUseCase {
    _logger;
    _doctorRepo;
    _doctorShiftRepo;
    constructor(_logger, _doctorRepo, _doctorShiftRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._doctorShiftRepo = _doctorShiftRepo;
    }
    async execute(shiftId, doctorId) {
        this._logger.info("Delete Doctor Schedule Attempt", { shiftId, doctorId });
        // checking if doctor exists
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        // checking if doctor can access the platform
        if (!doctor.canAccessPlatform()) {
            throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
        }
        // checking if shift exists
        const shift = await this._doctorShiftRepo.findById(shiftId);
        if (!shift) {
            throw new AppError(MESSAGE.DOC_SCHEDULE_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        // checking if shift belongs to doctor
        if (shift.doctorId !== doctor.id) {
            throw new AppError(MESSAGE.DOC_SCHEDULE_MIS_MATCH, HTTPStatus.BAD_REQUEST);
        }
        // deleting the shift
        await this._doctorShiftRepo.delete(shift.shiftId);
    }
}
//# sourceMappingURL=DeleteDoctorScheduleUseCase.js.map