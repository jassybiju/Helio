import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDeleteDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/IDeleteDoctorScheduleUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class DeleteDoctorScheduleUseCase implements IDeleteDoctorScheduleUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository
  ) {}
  async execute(shiftId: string, doctorId: string): Promise<void> {
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
      throw new AppError(
        MESSAGE.DOC_SCHEDULE_MIS_MATCH,
        HTTPStatus.BAD_REQUEST
      );
    }

    // deleting the shift
    await this._doctorShiftRepo.delete(shift.shiftId);
  }
}
