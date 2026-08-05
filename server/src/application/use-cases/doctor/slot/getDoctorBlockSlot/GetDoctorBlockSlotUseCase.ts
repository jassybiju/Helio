import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetDoctorBlockSlotUseCase } from "#application/ports/use-cases/doctor/slot/IGetDoctorBlockSlotUseCase.js";
import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class GetDoctorBlockSlotUseCase implements IGetDoctorBlockSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorBlockShiftRepo: IDoctorBlockShiftRepository
  ) {}
  async execute(doctorId: string): Promise<DoctorBlockShift[]> {
    this._logger.info("Get Doctor Block Slot  attempt", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const blockShifts = await this._doctorBlockShiftRepo.findByDoctor(doctorId);
    return blockShifts;
  }
}
