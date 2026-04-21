import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IToggleBlockDoctorUseCase } from "@application/ports/use-cases/admin/doctor/IToggleBlockDoctorUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class ToggleBlockDoctorUseCase implements IToggleBlockDoctorUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(userId: string): Promise<void> {
    this._logger.info("Toggle Block doctor attempt", { userId });

    const doctor = await this._doctorRepo.findById(userId);

    if (!doctor) {
      throw new AppError("Doctor Not found", HTTPStatus.NOT_FOUND);
    }

    if (!doctor.isProfileComplete()) {
      throw new AppError(
        "Doctor Profile not completed",
        HTTPStatus.BAD_REQUEST
      );
    }

    doctor.toogleBlockStatus();

    await this._doctorRepo.update(doctor);
  }
}
