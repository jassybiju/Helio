import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ISpecialityRepository } from "@application/ports/repositories/ISpeicaltyRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetAllSpecialityUseCase } from "@application/ports/use-cases/IGetAllSpecialityUseCase.ts";

export class GetAllSpecialtyUseCase implements IGetAllSpecialityUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _specialtyRepo: ISpecialityRepository
  ) {}
  async execute(): Promise<{ label: string; value: string }[]> {
    this._logger.info("Get All Specialty Attempt");

    const specialties = await this._specialtyRepo.findAllActive();

    return specialties.map((spec) => ({
      _id: spec.id,
      label: spec.name,
      value: spec.name,
    }));
  }
}
