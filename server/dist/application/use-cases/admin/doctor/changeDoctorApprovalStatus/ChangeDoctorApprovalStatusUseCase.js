import { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { Doctor } from "#domain/entities/Doctor.js";
export class ChangeDoctorApprovalStatusUseCase {
    _logger;
    _doctorRepo;
    constructor(_logger, _doctorRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
    }
    async execute(input, doctorId) {
        this._logger.info("Doctor Approval Status Change attempt", {
            verification_status: input.verification_status,
            doctorId,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        if (!Doctor.isValidTransistion(doctor.verificationStatus, input.verification_status)) {
            throw new AppError("Invalid Approval Status", HTTPStatus.BAD_REQUEST);
        }
        if (input.verification_status === DOCTOR_VERIFICATION_STATUS.APPROVED) {
            doctor.approve();
        }
        else if (input.verification_status === DOCTOR_VERIFICATION_STATUS.REJECTED) {
            if (!input.rejection_reason) {
                throw new AppError("Rejection Reason is required for rejecting", HTTPStatus.BAD_REQUEST);
            }
            doctor.reject(input.rejection_reason);
        }
        await this._doctorRepo.update(doctor);
        return {
            doctorId,
            verification_status: input.verification_status,
            rejection_reason: input.rejection_reason,
        };
    }
}
//# sourceMappingURL=ChangeDoctorApprovalStatusUseCase.js.map