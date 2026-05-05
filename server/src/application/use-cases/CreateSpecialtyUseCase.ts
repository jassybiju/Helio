import type { ISpecialityRepository } from "@application/ports/repositories/ISpeicaltyRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ICreateSpecialtyUseCase } from "@application/ports/use-cases/ICreateSpecialtyUseCase.ts";

export class CreateSpecialtyUseCase implements ICreateSpecialtyUseCase {
  constructor(
    private readonly _specialtyRepo: ISpecialityRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _logger: ILogger
  ) {}

  async execute(input: {
    name: string;
    description?: string;
  }): Promise<{ id: string }> {
    this._logger.info("Create Specialty Attempt", input);

    // normalize name (important)
    const name = input.name.trim();

    if (!name) {
      throw new AppError("Specialty name is required", HTTPStatus.BAD_REQUEST);
    }

    // (optional but recommended) check duplicate

    const id = this._idGenerator.generate("SPEC_");

    await this._specialtyRepo.create({
      _id: id,
      name,
      description: input.description ?? null,
    });

    return { id };
  }
}
