import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IToggleBlockPatientUseCase } from "@application/ports/use-cases/admin/patient/IToggleBlockPatientUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class ToggleBlockPatientUseCase implements IToggleBlockPatientUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}
  async execute(userId: string): Promise<void> {
    const patient = await this._patientRepo.findById(userId);

    if (!patient) {
      throw new AppError("User not found", HTTPStatus.NOT_FOUND);
    }

    patient.toogleBlockStatus();

    await this._patientRepo.save(patient);
  }
}
