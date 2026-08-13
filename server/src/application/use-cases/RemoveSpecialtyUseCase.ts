import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemoveSpecialtyUseCase } from "#application/ports/use-cases/IRemoveSpecialtyUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class RemoveSpecialtyUseCase implements IRemoveSpecialtyUseCase {
  constructor(
    private readonly _specialtyRepo: ISpecialityRepository,
    private readonly _logger: ILogger
  ) {}

  async execute(id: string): Promise<void> {
    this._logger.info("Remove Specialty Attempt", { id });

    if (!id) {
      throw new AppError("Specialty ID is required", HTTPStatus.BAD_REQUEST);
    }

    const existing = await this._specialtyRepo.findByName(id);

    if (!existing) {
      throw new AppError("Specialty not found", HTTPStatus.NOT_FOUND);
    }

    if (!existing.isActive) {
      throw new AppError("Specialty already inactive", HTTPStatus.BAD_REQUEST);
    }

    await this._specialtyRepo.delete(id);
  }
}
