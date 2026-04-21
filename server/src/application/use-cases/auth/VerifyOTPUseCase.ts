import type {
  IVerifyOtpRequestDTO,
  IVerifyOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IOTPRepository } from "@application/ports/repositories/IOTPRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IVerifyOTPUseCase } from "@application/ports/use-cases/auth/IVerifyOTPUseCase.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Patient } from "@domain/entities/Patient.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class VerifyOTPUseCase implements IVerifyOTPUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _otpRepo: IOTPRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository
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
    }

    await this._otpRepo.delete(id);

    return { is_verified: true };
  }
}
