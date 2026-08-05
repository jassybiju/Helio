import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemoveSpecialtyUseCase } from "#application/ports/use-cases/IRemoveSpecialtyUseCase.js";
export declare class RemoveSpecialtyUseCase implements IRemoveSpecialtyUseCase {
    private readonly _specialtyRepo;
    private readonly _logger;
    constructor(_specialtyRepo: ISpecialityRepository, _logger: ILogger);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=RemoveSpecialtyUseCase.d.ts.map