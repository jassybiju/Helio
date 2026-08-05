import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ICreateSpecialtyUseCase } from "#application/ports/use-cases/ICreateSpecialtyUseCase.js";
export declare class CreateSpecialtyUseCase implements ICreateSpecialtyUseCase {
    private readonly _specialtyRepo;
    private readonly _idGenerator;
    private readonly _logger;
    constructor(_specialtyRepo: ISpecialityRepository, _idGenerator: IIDGenerator, _logger: ILogger);
    execute(input: {
        name: string;
        description?: string;
    }): Promise<{
        id: string;
    }>;
}
//# sourceMappingURL=CreateSpecialtyUseCase.d.ts.map