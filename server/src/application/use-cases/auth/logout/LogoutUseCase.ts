import type { ILogoutUseCase } from "@application/ports/use-cases/auth/ILogoutUseCase.ts";
import type { ILogoutRequestDTO } from "./ILogoutDto.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IAccessTokenService } from "@application/ports/services/IAccessTokenService.ts";
import type { IRefreshTokenService } from "@application/ports/services/IRefreshTokenService.ts";
import type { ISessionRepository } from "@application/ports/repositories/ISessionRepository.ts";

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
