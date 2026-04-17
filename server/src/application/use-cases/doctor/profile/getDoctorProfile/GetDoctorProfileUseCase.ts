import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetDoctorProfileUseCase } from "@application/ports/use-cases/doctor/profile/IGetDoctorProfileUseCase.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GetDoctorProfileUseCase implements IGetDoctorProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(doctorId: string): Promise<Doctor> {
    this._logger.info("Get Doctor Profile attempt", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    return doctor;
  }
}
