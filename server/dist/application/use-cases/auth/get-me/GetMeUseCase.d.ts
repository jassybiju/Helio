import type { IGetMeRequestDTO, IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import type { IGetMeUseCase } from "#application/ports/use-cases/auth/IGetMeUseCase.js";
/**
 * Get the details of the user from userId and role from middlewares
 */
export declare class GetMeUseCase implements IGetMeUseCase {
    private readonly _logger;
    private readonly _handlers;
    constructor(_logger: ILogger, _handlers: IGetMeHandler[]);
    execute(input: IGetMeRequestDTO): Promise<IGetMeResponseDTO>;
}
//# sourceMappingURL=GetMeUseCase.d.ts.map