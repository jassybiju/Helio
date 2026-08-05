import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { IRefreshTokenUseCase } from "#application/ports/use-cases/auth/IRefreshTokenUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _sessionRepo: ISessionRepository,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _accessTokenService: IAccessTokenService
  ) {}
  async execute(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    this._logger.info("Get Access Token attemp", { refreshToken });
    const tokenHash = this._refreshTokenService.hash(refreshToken);

    const session = await this._sessionRepo.getRefreshToken(tokenHash);

    if (!session) {
      throw new AppError("Invalid Refresh Token", HTTPStatus.UNAUTHORIZED);
    }

    const { userId, role, email } = session;

    const newAccessToken = this._accessTokenService.generateAccessToken(
      userId,
      email,
      role
    );
    const newRefreshToken = this._refreshTokenService.generateRefreshToken();

    const hashedToken = this._refreshTokenService.hash(newRefreshToken);
    await this._sessionRepo.deleteRefreshToken(tokenHash);

    await this._sessionRepo.storeRefreshToken(userId, role, email, hashedToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
