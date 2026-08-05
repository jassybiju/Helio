import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "#application/dto/auth/ILoginDTO.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import { Email } from "#domain/value-objects/Email.js";

export class LoginAdminUseCase implements ILoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _adminRepo: IAdminRepository,
    private readonly _passwordService: IPasswordService,
    private readonly _sessionRepo: ISessionRepository
  ) {}

  async execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const { password, email } = input;

    this._logger.info("Admin Login attempt", { email });

    const admin = await this._adminRepo.findByEmail(new Email(email));

    if (!admin) {
      throw new AppError("Admin NOt Foudn", HTTPStatus.NOT_FOUND);
    }

    const isPasswordValid = await this._passwordService.compare(
      password,
      admin.passwordHash
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid Email or password", HTTPStatus.BAD_REQUEST);
    }

    // create access and refresh token
    const accessToken = this._accessTokenService.generateAccessToken(
      admin.id,
      admin.email.value,
      USER_ROLES.ADMIN
    );
    const refreshToken = this._refreshTokenService.generateRefreshToken();

    //saving refresh token
    await this._sessionRepo.storeRefreshToken(
      admin.id,
      USER_ROLES.ADMIN,
      admin.email.value,
      this._refreshTokenService.hash(refreshToken)
    );

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
