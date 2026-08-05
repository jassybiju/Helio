export class LogoutUseCase {
    _logger;
    _refreshTokenService;
    _sessionRepo;
    constructor(_logger, _refreshTokenService, _sessionRepo) {
        this._logger = _logger;
        this._refreshTokenService = _refreshTokenService;
        this._sessionRepo = _sessionRepo;
    }
    async execute(input) {
        this._logger.info("Logout attempt", input);
        const { userId, refreshToken } = input;
        // get refresh token
        await this._sessionRepo.deleteRefreshToken(this._refreshTokenService.hash(refreshToken));
        this._logger.info("User Logout successful", { userId });
    }
}
//# sourceMappingURL=LogoutUseCase.js.map