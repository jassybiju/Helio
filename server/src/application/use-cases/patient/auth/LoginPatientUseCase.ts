import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "#application/dto/auth/ILoginDTO.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { PatientValidator } from "#application/validators/PatientValidator.js";
import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export class LoginPatientUseCase implements ILoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _patientValidator: PatientValidator,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _sessionRepo: ISessionRepository
  ) {}

  async execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const { email, password } = input;
    this._logger.info("Patient Login Attempt", { email, password });

    // fetch patient from db
    const patient = await this._patientRepo.findByEmail(new Email(email));

    // check if patient exists
    if (!patient) {
      throw new AppError("Invalid Email or passwords", HTTPStatus.BAD_REQUEST);
    }

    if (!patient.isVerified) {
      throw new AppError("Invalid Emails or password", HTTPStatus.BAD_REQUEST);
    }
    if (patient.isBlocked) {
      throw new AppError(
        "Patient Blocked contact admin",
        HTTPStatus.BAD_REQUEST
      );
    }

    // verify patient password
    await this._patientValidator.validatePatientPassword(patient, password);

    // create refresh and access token
    const accessToken = this._accessTokenService.generateAccessToken(
      patient.id,
      patient.email,
      USER_ROLES.PATIENT
    );
    const refreshToken = this._refreshTokenService.generateRefreshToken();

    //saving hashed refresh token
    await this._sessionRepo.storeRefreshToken(
      patient.id,
      USER_ROLES.PATIENT,
      patient.email,
      this._refreshTokenService.hash(refreshToken)
    );

    // return response
    return {
      accessToken,
      refreshToken,
      user: {
        id: patient.id,
        role: USER_ROLES.PATIENT,
        email: patient.email,
      },
    };
  }
}
