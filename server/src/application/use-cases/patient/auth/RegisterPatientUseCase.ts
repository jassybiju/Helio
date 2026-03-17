import type {
  IRegisterPatientRequestDTO,
  IRegisterPatientResponseDTO,
} from "@application/dto/patient/auth/IRegisterPatientDTO.ts";
import type { IOTPRepository } from "@application/ports/repositories/IOTPRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IOTPService } from "@application/ports/services/IOTPService.ts";
import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import type { IRegisterPatientUseCase } from "@application/ports/use-cases/patient/auth/IRegisterPatientUseCase.ts";
import type { PatientValidator } from "@application/validators/PatientValidator.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import { OTP } from "@domain/entities/OTP.ts";
import { Patient } from "@domain/entities/Patient.ts";
import { Email } from "@domain/value-objects/Email.ts";

export class RegisterPatientUseCase implements IRegisterPatientUseCase {
  constructor(
    private readonly _patientValidator: PatientValidator,
    private readonly _patientRepo: IPatientRepository,
    private readonly _passwordService: IPasswordService,
    private readonly _idGenerator: IIDGenerator,
    private readonly _logger: ILogger,
    private readonly _otpService: IOTPService,
    private readonly _otpRepo: IOTPRepository
  ) {}

  async execute(
    input: IRegisterPatientRequestDTO
  ): Promise<IRegisterPatientResponseDTO> {
    const { first_name, last_name, dob, email, gender, password } = input;

    this._logger.info("Registering User");

    // ensuring there is no verified user with the email
    const existingPatient =
      await this._patientValidator.ensureEmailAvailable(email);

    // creating new patient ( if unverified patient exists keep the id to prevent duplicating email in db )
    const patient = new Patient(
      existingPatient ? existingPatient.id : this._idGenerator.generate("USR"),
      new Email(email),
      await this._passwordService.hash(password),
      first_name,
      last_name,
      gender as GENDER,
      new Date(dob),
      null,
      false,
      false,
      new Date(),
      new Date()
    );

    await this._patientRepo.save(patient)

    // generate otp
    let otp = OTP.create({
      id: this._idGenerator.generate("OTP"),
      purpose: "REGISTER",
      email: new Email(email),
      otp: this._otpService.generate(),
      context: "patient",
    });
    await this._otpRepo.save(otp);

    return {
      otp_invalid_at: String(otp.invalidAt.getTime()),
      email,
      id: otp.id,
    };
  }
}
