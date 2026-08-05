import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Email } from "#domain/value-objects/Email.js";
export class LoginAdminUseCase {
    _logger;
    _accessTokenService;
    _refreshTokenService;
    _adminRepo;
    _passwordService;
    _sessionRepo;
    constructor(_logger, _accessTokenService, _refreshTokenService, _adminRepo, _passwordService, _sessionRepo) {
        this._logger = _logger;
        this._accessTokenService = _accessTokenService;
        this._refreshTokenService = _refreshTokenService;
        this._adminRepo = _adminRepo;
        this._passwordService = _passwordService;
        this._sessionRepo = _sessionRepo;
    }
    async execute(input) {
        const { password, email } = input;
        this._logger.info("Admin Login attempt", { email });
        const admin = await this._adminRepo.findByEmail(new Email(email));
        if (!admin) {
            throw new AppError("Admin NOt Foudn", HTTPStatus.NOT_FOUND);
        }
        const isPasswordValid = await this._passwordService.compare(password, admin.passwordHash);
        if (!isPasswordValid) {
            throw new AppError("Invalid Email or password", HTTPStatus.BAD_REQUEST);
        }
        // create access and refresh token
        const accessToken = this._accessTokenService.generateAccessToken(admin.id, admin.email.value, USER_ROLES.ADMIN);
        const refreshToken = this._refreshTokenService.generateRefreshToken();
        //saving refresh token
        await this._sessionRepo.storeRefreshToken(admin.id, USER_ROLES.ADMIN, admin.email.value, this._refreshTokenService.hash(refreshToken));
        return {
            accessToken,
            refreshToken,
            user: {
                id: admin.id,
                email: admin.email.value,
                role: USER_ROLES.ADMIN,
            },
        };
    }
}
//# sourceMappingURL=LoginAdminUseCase.js.map