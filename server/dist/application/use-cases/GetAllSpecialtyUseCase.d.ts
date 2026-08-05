import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllSpecialityUseCase } from "#application/ports/use-cases/IGetAllSpecialityUseCase.js";
export declare class GetAllSpecialtyUseCase implements IGetAllSpecialityUseCase {
    private readonly _logger;
    private readonly _specialtyRepo;
    constructor(_logger: ILogger, _specialtyRepo: ISpecialityRepository);
    execute(): Promise<{
        label: string;
        value: string;
    }[]>;
}
//# sourceMappingURL=GetAllSpecialtyUseCase.d.ts.map