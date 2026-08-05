import type {
  IVerifyOtpRequestDTO,
  IVerifyOTPResponseDTO,
} from "#application/dto/auth/IOTPDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IVerifyOTPUseCase } from "#application/ports/use-cases/auth/IVerifyOTPUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { Doctor } from "#domain/entities/Doctor.js";
import type { Patient } from "#domain/entities/Patient.js";
import { Wallet } from "#domain/entities/Wallet.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class VerifyOTPUseCase implements IVerifyOTPUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _otpRepo: IOTPRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _walletRepo: IWalletRepository,
    private readonly _idGenerator: IIDGenerator
  ) {}
  async execute(input: IVerifyOtpRequestDTO): Promise<IVerifyOTPResponseDTO> {
    const { id, otp, context } = input;
    this._logger.info("Verifying otp :  ", input);

    //getting otp data from using id
    const otpData = await this._otpRepo.findByIdAndContext(id, context);
    this._logger.info("Saved : OTP : ", otpData);

    // if no otp found throw error
    if (!otpData) {
      throw new AppError("OTP not found", HTTPStatus.NOT_FOUND);
    }

    //verifying otp
    let OTP_LIMIT = Number(process.env.OTP_LIMIT || 5);

    try {
      otpData.verify(otp, OTP_LIMIT);
    } catch (error) {
      this._logger.debug(
        "OTP LIMIT UPDATED",
        otpData.hasExceededLimit(OTP_LIMIT)
      );
      if (!otpData.hasExceededLimit(OTP_LIMIT)) {
        await this._otpRepo.save(otpData);
      }
      throw error;
    }

    // otp is correct
    let user: Patient | Doctor | null;

    let wallet: Wallet | null = null;
    const WALLET_PREFIX = process.env.WALLET_PREFIX!;
    const walletId = this._idGenerator.generate(WALLET_PREFIX);

    if (context === "patient") {
      user = await this._patientRepo.findByEmail(otpData.email);

      if (!user) {
        throw new AppError("User not found", HTTPStatus.NOT_FOUND);
      }

      if (user.isVerified) {
        throw new AppError("User Already Verified", HTTPStatus.BAD_REQUEST);
      }

      user.verifyPatient();

      await this._patientRepo.update(user);

      // creating wallet for patient
      wallet = Wallet.create({
        id: walletId,
        userId: user.id,
        userRole: USER_ROLES.PATIENT,
      });
    } else if (context === "doctor") {
      user = await this._doctorRepo.findByEmail(otpData.email);

      if (!user) {
        throw new AppError("User not found", HTTPStatus.NOT_FOUND);
      }
      if (user.isVerified) {
        throw new AppError("User Already Verified", HTTPStatus.BAD_REQUEST);
      }
      user.verifyDoctor();
      await this._doctorRepo.update(user);

      // creating wallet for doctor
      wallet = Wallet.create({
        id: walletId,
        userId: user.id,
        userRole: USER_ROLES.DOCTOR,
      });
    }

    await this._otpRepo.delete(id);
    if (wallet) {
      await this._walletRepo.create(wallet);
    }
    return { is_verified: true };
  }
}
