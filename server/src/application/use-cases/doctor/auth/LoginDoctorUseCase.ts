import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "@application/dto/auth/ILoginDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ISessionRepository } from "@application/ports/repositories/ISessionRepository.ts";
import type { IAccessTokenService } from "@application/ports/services/IAccessTokenService.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IRefreshTokenService } from "@application/ports/services/IRefreshTokenService.ts";
import type { ILoginUseCase } from "@application/ports/use-cases/auth/ILoginUseCase.ts";
import { DoctorValidator } from "@application/validators/DoctorValidator.ts";
import { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@shared/types/UserRoles.ts";

export class LoginDoctorUseCase implements ILoginUseCase {
  constructor(
    private readonly _loggerService: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorValidator: DoctorValidator,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _sessionService: ISessionRepository
  ) {}

  async execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const { email, password } = input;

    this._loggerService.info("Doctor Login Attempt", { email });
    // ensure email exists
    const doctor = await this._doctorRepo.findByEmail(new Email(email));
    if (!doctor) {
      throw new AppError("No User Found", HTTPStatus.BAD_REQUEST);
    }

    // check if user is_verifed
    if (!doctor.isVerified) {
      throw new AppError("Doctor Not Verified", HTTPStatus.BAD_REQUEST);
    }

    // check if password same
    await this._doctorValidator.validateDoctorPassword(doctor, password)
    

    // create token
    const accessToken = this._accessTokenService.generateAccessToken(
      doctor.id,
      doctor.email,
      USER_ROLES.DOCTOR
    );
    const refreshToken = this._refreshTokenService.generateRefreshToken();
    await this._sessionService.storeRefreshToken(
      doctor.id,
      USER_ROLES.DOCTOR,
      this._refreshTokenService.hash(refreshToken),
    );

    // return obj
    return {
      accessToken,
      refreshToken,
      user: {
        email: doctor.email,
        id: doctor.id,
        role: USER_ROLES.DOCTOR,
      },
    };
  }
}
