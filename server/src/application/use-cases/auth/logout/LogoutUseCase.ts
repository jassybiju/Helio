import type { ILogoutUseCase } from "#application/ports/use-cases/auth/ILogoutUseCase.js";
import type { ILogoutRequestDTO } from "./ILogoutDto.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _sessionRepo: ISessionRepository
  ) {}
  async execute(input: ILogoutRequestDTO): Promise<void> {
    this._logger.info("Logout attempt", input);

    const { userId, refreshToken } = input;

    // get refresh token
    await this._sessionRepo.deleteRefreshToken(
      this._refreshTokenService.hash(refreshToken)
    );

    this._logger.info("User Logout successful", { userId });
  }
}
