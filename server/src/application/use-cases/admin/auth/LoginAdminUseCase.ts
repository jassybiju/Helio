import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "@application/dto/auth/ILoginDTO.ts";
import type { ISessionRepository } from "@application/ports/repositories/ISessionRepository.ts";
import type { IAccessTokenService } from "@application/ports/services/IAccessTokenService.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IRefreshTokenService } from "@application/ports/services/IRefreshTokenService.ts";
import type { ILoginUseCase } from "@application/ports/use-cases/auth/ILoginUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@shared/types/UserRoles.ts";

export class LoginAdminUseCase implements ILoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _sessionRepo: ISessionRepository
  ) {}

  async execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const { password, email } = input;

    this._logger.info("Admin Login attempt", { email });

    const ADMIN_ID = process.env.ADMIN_ID!;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
    const ADMIN_PASS = process.env.ADMIN_PASS!;

    if (!(ADMIN_EMAIL === email || ADMIN_PASS === password)) {
      throw new AppError("Invalid Email or password", HTTPStatus.BAD_REQUEST);
    }

    // create access and refresh token
    const accessToken = this._accessTokenService.generateAccessToken(
      ADMIN_ID,
      ADMIN_EMAIL,
      USER_ROLES.ADMIN
    );
    const refreshToken = this._refreshTokenService.generateRefreshToken();

    //saving refresh token
    await this._sessionRepo.storeRefreshToken(
      ADMIN_ID,
      USER_ROLES.ADMIN,
      this._refreshTokenService.hash(refreshToken)
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: ADMIN_ID,
        email: ADMIN_EMAIL,
        role: USER_ROLES.ADMIN,
      },
    };
  }
}
