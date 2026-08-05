import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllSpecialityUseCase } from "#application/ports/use-cases/IGetAllSpecialityUseCase.js";

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
