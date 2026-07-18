import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetDoctorBlockSlotUseCase } from "@application/ports/use-cases/doctor/slot/IGetDoctorBlockSlotUseCase.ts";
import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
