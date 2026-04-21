import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUpdateDoctorFeeUseCase } from "@application/ports/use-cases/doctor/profile/IUpdateDoctorFeeUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
