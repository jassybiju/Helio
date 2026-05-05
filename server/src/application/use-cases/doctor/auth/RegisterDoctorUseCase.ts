import type {
  IRegisterDoctorRequestDTO,
  IRegisterDoctorReponseDTO,
} from "@application/dto/doctor/auth/IRegisterDoctorDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IOTPRepository } from "@application/ports/repositories/IOTPRepository.ts";
import type { IEmailService } from "@application/ports/services/IEmailService.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IOTPService } from "@application/ports/services/IOTPService.ts";
import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import type { IRegisterDoctorUseCase } from "@application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.ts";
import type { DoctorValidator } from "@application/validators/DoctorValidator.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import { Doctor } from "@domain/entities/Doctor.ts";
import { OTP } from "@domain/entities/OTP.ts";
import { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class RegisterDoctorUseCase implements IRegisterDoctorUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorValidator: DoctorValidator,
    private readonly _idGenerator: IIDGenerator,
    private readonly _passwordService: IPasswordService,
    private readonly _fileUpload: IFileUpload,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _otpRepo: IOTPRepository,
    private readonly _otpService: IOTPService,
    private readonly _emailService: IEmailService
  ) {}

  async execute(
    input: IRegisterDoctorRequestDTO
  ): Promise<IRegisterDoctorReponseDTO> {
    this._logger.info("Doctor Registration Starteds");

    const {
      email,
      full_name,
      specialization,
      career_start_year,
      gender,
      password,
      document,
    } = input;
    // checking if doctor already exists with isVerified true
    const existingDoctor =
      await this._doctorValidator.ensureEmailAvailable(email);

    const isNew = !existingDoctor;

    // saving documnets to bucket
    const documentKey = await this._fileUpload.upload(document);

    // creating new doctor ( if unverified doctor exists keep the id and changes data )
    const doctor = Doctor.create({
      id: existingDoctor
        ? existingDoctor.id
        : this._idGenerator.generate(process.env.DOCTOR_PREFIX || "DOC"),
      passwordHash: await this._passwordService.hash(password),
      email: new Email(email),
      gender: gender as GENDER,
      full_name,
      specialization,
      career_start_year,
      documentKey,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // saving doctor
    if (isNew) {
      await this._doctorRepo.create(doctor);
      this._logger.debug("Doctor Created");
    } else {
      await this._doctorRepo.update(doctor);
      this._logger.debug("Doctor Updated");
    }

    // generating otp
    let otp = OTP.create({
      id: this._idGenerator.generate(process.env.OTP_PREFIX || "OTP"),
      purpose: "REGISTER",
      otp: this._otpService.generate(),
      email: new Email(email),
      context: "doctor",
    });

    // saving otp
    await this._otpRepo.save(otp);
    this._logger.debug("OTP Saved");

    // sending otp
    await this._emailService.sendEmail({
      to: email,
      subject: "Your OTP For the helixo",
      body: `Your OTP is ${otp.code}`,
    });

    return {
      status: "pending",
      otp_invalid_at: String(otp.invalidAt.getTime()),
      id: otp.id,
      email: otp.email.value,
    };
  }
}
