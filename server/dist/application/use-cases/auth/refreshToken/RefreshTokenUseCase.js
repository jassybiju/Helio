import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class RefreshTokenUseCase {
    _logger;
    _sessionRepo;
    _refreshTokenService;
    _accessTokenService;
    constructor(_logger, _sessionRepo, _refreshTokenService, _accessTokenService) {
        this._logger = _logger;
        this._sessionRepo = _sessionRepo;
        this._refreshTokenService = _refreshTokenService;
        this._accessTokenService = _accessTokenService;
    }
    async execute(refreshToken) {
        this._logger.info("Get Access Token attemp", { refreshToken });
        const tokenHash = this._refreshTokenService.hash(refreshToken);
        const session = await this._sessionRepo.getRefreshToken(tokenHash);
        if (!session) {
            throw new AppError("Invalid Refresh Token", HTTPStatus.UNAUTHORIZED);
        }
        const { userId, role, email } = session;
        const newAccessToken = this._accessTokenService.generateAccessToken(userId, email, role);
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
//# sourceMappingURL=RefreshTokenUseCase.js.map