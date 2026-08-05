import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUpdateDoctorFeeUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateDoctorFeeUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class UpdateDoctorFeeUseCase implements IUpdateDoctorFeeUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(
    doctorId: string,
    onlineFee: number,
    clinicFee: number
  ): Promise<void> {
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
