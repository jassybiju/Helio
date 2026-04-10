import type { IGoogleLoginResponseDTO } from "@application/dto/auth/IGoogleLoginDTO.ts";
import type { ILoginResponseDTO } from "@application/dto/auth/ILoginDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ISessionRepository } from "@application/ports/repositories/ISessionRepository.ts";
import type { IAccessTokenService } from "@application/ports/services/IAccessTokenService.ts";
import type { IGoogleAuthService } from "@application/ports/services/IGoogleAuthService.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IRefreshTokenService } from "@application/ports/services/IRefreshTokenService.ts";
import type { IGoogleLoginUseCase } from "@application/ports/use-cases/auth/IGoogleLoginUseCase.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { Doctor } from "@domain/entities/Doctor.ts";
import { Patient } from "@domain/entities/Patient.ts";
import { Email } from "@domain/value-objects/Email.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _googleAuthService: IGoogleAuthService,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _sessionRepo: ISessionRepository
  ) {}
  async execute({
    credentials,
    role,
  }: {
    credentials: string;
    role: USER_ROLES;
  }): Promise<IGoogleLoginResponseDTO> {
    this._logger.info("Google Auth Attempt");

    // verifiying google Credeintails and getting data
    const googleUser =
      await this._googleAuthService.verifyCredentials(credentials);

    // intializing user and isProfileCOmplete
    let user!: Doctor | Patient;
    let isProfileComplete: boolean = true;

    // if role === DOCTOR
    if (role === USER_ROLES.DOCTOR) {
      // checks it doctor already exists
      let existingDoctor = await this._doctorRepo.findByEmail(
        new Email(googleUser.email)
      );

      // if no doctor create one
      if (!existingDoctor) {
        existingDoctor = Doctor.googleCreate({
          id: this._idGenerator.generate(process.env.DOCTOR_PREFIX!),
          email: new Email(googleUser.email),
          fullName: googleUser.name,
          googleId: googleUser.googleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(existingDoctor);
      }

      if (existingDoctor.isBlocked) {
        throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
      }

      // if doctor is not linked with googleId link it
      if (!existingDoctor.hasGoogleId) {
        existingDoctor.linkGoogleId(googleUser.googleId);
      }

      // saving the doctor
      await this._doctorRepo.save(existingDoctor);

      isProfileComplete = existingDoctor.isProfileComplete();
      console.log(isProfileComplete);
      user = existingDoctor;
    }
    if (role === USER_ROLES.PATIENT) {
      let existingPatient = await this._patientRepo.findByEmail(
        new Email(googleUser.email)
      );
      if (!existingPatient) {
        existingPatient = Patient.googleCreate({
          id: this._idGenerator.generate(process.env.PATIENT_PREFIX!),
          email: new Email(googleUser.email),
          firstName: googleUser.name,
          googleId: googleUser.googleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (existingPatient.isBlocked) {
        throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
      }

      if (!existingPatient.hasGoogleId) {
        existingPatient.linkGoogleId(googleUser.googleId);
      }
      await this._patientRepo.save(existingPatient);

      isProfileComplete = existingPatient.isProfileComplete();
      user = existingPatient;
    }

    const accessToken = this._accessTokenService.generateAccessToken(
      user.id!,
      user.email!,
      role
    );
    const refreshToken = this._refreshTokenService.generateRefreshToken();

    await this._sessionRepo.storeRefreshToken(
      user.id!,
      role,
      user.email!,
      this._refreshTokenService.hash(refreshToken)
    );
    console.log(isProfileComplete);
    return {
      accessToken,
      refreshToken,
      user: {
        email: user.email!,
        role: role,
        id: user.id!,
        isProfileComplete,
      },
    };
  }
}
