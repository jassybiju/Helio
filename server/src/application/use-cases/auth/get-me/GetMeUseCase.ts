import type {
  IGetMeRequestDTO,
  IGetMeResponseDTO,
} from "#application/dto/auth/IGetMeDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import type { IGetMeUseCase } from "#application/ports/use-cases/auth/IGetMeUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

/**
 * Get the details of the user from userId and role from middlewares
 */
export class GetMeUseCase implements IGetMeUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _handlers: IGetMeHandler[]
  ) {}

  async execute(input: IGetMeRequestDTO): Promise<IGetMeResponseDTO> {
    const { id, role } = input;
    this._logger.info("Get me attempt", { id });
    // fetch user based on role
    const handler = this._handlers.find((h) => h.supports(role));

    if (!handler) {
      throw new AppError("Invalid Role", HTTPStatus.BAD_REQUEST);
    }

    return await handler.execute(id);
  }
}
