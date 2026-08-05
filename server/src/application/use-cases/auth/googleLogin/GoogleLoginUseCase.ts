import type { IGoogleLoginResponseDTO } from "#application/dto/auth/IGoogleLoginDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { IGoogleAuthService } from "#application/ports/services/IGoogleAuthService.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { IGoogleLoginUseCase } from "#application/ports/use-cases/auth/IGoogleLoginUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Doctor } from "#domain/entities/Doctor.js";
import { Patient } from "#domain/entities/Patient.js";
import { Wallet } from "#domain/entities/Wallet.js";
import { Email } from "#domain/value-objects/Email.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _googleAuthService: IGoogleAuthService,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _sessionRepo: ISessionRepository,
    private readonly _walletRepo: IWalletRepository
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
    let user: Doctor | Patient | null = null;
    let isProfileComplete: boolean = true;

    let wallet: Wallet | null = null;
    const WALLET_PREFIX = process.env.WALLET_PREFIX!;
    let walletId = this._idGenerator.generate(WALLET_PREFIX);
    // if role === DOCTOR
    if (role === USER_ROLES.DOCTOR) {
      let isNew = false;
      // checks it doctor already exists
      let existingDoctor = await this._doctorRepo.findByEmail(
        new Email(googleUser.email)
      );

      // if have unverified doctor
      if (existingDoctor && !existingDoctor.isVerified) {
        existingDoctor = Doctor.googleCreate({
          id: existingDoctor.id,
          email: new Email(googleUser.email),
          fullName: googleUser.name,
          googleId: googleUser.googleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

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
        isNew = true;
        wallet = Wallet.create({
          id: walletId,
          userId: existingDoctor.id,
          userRole: USER_ROLES.DOCTOR,
        });
      }

      if (existingDoctor.isBlocked) {
        throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
      }

      // if doctor is not linked with googleId link it
      if (!existingDoctor.hasGoogleId) {
        existingDoctor.linkGoogleId(googleUser.googleId);
      }
      // saving the doctor
      if (isNew) {
        await this._doctorRepo.create(existingDoctor);
      } else {
        await this._doctorRepo.update(existingDoctor);
      }

      isProfileComplete = existingDoctor.isProfileComplete();
      user = existingDoctor;
    }

    // if role === PATIENT

    if (role === USER_ROLES.PATIENT) {
      let isNew = false;

      let existingPatient = await this._patientRepo.findByEmail(
        new Email(googleUser.email)
      );
      //if has unverified patient
      if (existingPatient && !existingPatient.isVerified) {
        existingPatient = Patient.googleCreate({
          id: existingPatient.id,
          email: new Email(googleUser.email),
          firstName: googleUser.name,
          googleId: googleUser.googleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      if (!existingPatient) {
        existingPatient = Patient.googleCreate({
          id: this._idGenerator.generate(process.env.PATIENT_PREFIX!),
          email: new Email(googleUser.email),
          firstName: googleUser.name,
          googleId: googleUser.googleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        isNew = true;

        wallet = Wallet.create({
          id: walletId,
          userId: existingPatient.id,
          userRole: USER_ROLES.PATIENT,
        });
      }

      if (existingPatient.isBlocked) {
        throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
      }

      if (!existingPatient.hasGoogleId) {
        existingPatient.linkGoogleId(googleUser.googleId);
      }

      if (isNew) {
        await this._patientRepo.create(existingPatient);
      } else {
        await this._patientRepo.update(existingPatient);
      }

      isProfileComplete = existingPatient.isProfileComplete();
      user = existingPatient;
    }

    if (!user) {
      throw new AppError("User not initialized", HTTPStatus.INTERNAL_ERROR);
    }
    const accessToken = this._accessTokenService.generateAccessToken(
      user.id!,
      user.email!,
      role
    );
    const refreshToken = this._refreshTokenService.generateRefreshToken();

    if (wallet) {
      await this._walletRepo.create(wallet);
    }

    await this._sessionRepo.storeRefreshToken(
      user.id!,
      role,
      user.email!,
      this._refreshTokenService.hash(refreshToken)
    );
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
