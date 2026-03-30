import type {
  IGetMeRequestDTO,
  IGetMeResponseDTO,
} from "@application/dto/auth/IGetMeDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetMeHandler } from "@application/ports/use-cases/auth/IGetMeHandler.ts";
import type { IGetMeUseCase } from "@application/ports/use-cases/auth/IGetMeUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

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
