import type {
  IRegisterPatientRequestDTO,
  IRegisterPatientResponseDTO,
} from "#application/dto/patient/auth/IRegisterPatientDTO.js";
import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IEmailService } from "#application/ports/services/IEmailService.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IOTPService } from "#application/ports/services/IOTPService.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IRegisterPatientUseCase } from "#application/ports/use-cases/patient/auth/IRegisterPatientUseCase.js";
import type { PatientValidator } from "#application/validators/PatientValidator.js";
import type { GENDER } from "#domain/common/enums/gender.enum.js";
import { OTP } from "#domain/entities/OTP.js";
import { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";

export class RegisterPatientUseCase implements IRegisterPatientUseCase {
  constructor(
    private readonly _patientValidator: PatientValidator,
    private readonly _patientRepo: IPatientRepository,
    private readonly _passwordService: IPasswordService,
    private readonly _idGenerator: IIDGenerator,
    private readonly _logger: ILogger,
    private readonly _otpService: IOTPService,
    private readonly _otpRepo: IOTPRepository,
    private readonly _emailService: IEmailService
  ) {}

  async execute(
    input: IRegisterPatientRequestDTO
  ): Promise<IRegisterPatientResponseDTO> {
    const { first_name, last_name, dob, email, gender, password, phone } =
      input;

    this._logger.info("Registering User");

    // ensuring there is no verified user with the email
    const existingPatient =
      await this._patientValidator.ensureEmailAvailable(email);

    const isNew = !existingPatient;
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
      null,
      phone,
      false,
      false,
      [],
      [],
      null,
      new Date(),
      new Date()
    );

    if (isNew) {
      await this._patientRepo.create(patient);
    } else {
      await this._patientRepo.update(patient);
    }

    // generate otp
    let otp = OTP.create({
      id: this._idGenerator.generate("OTP"),
      purpose: "REGISTER",
      email: new Email(email),
      otp: this._otpService.generate(),
      context: "patient",
    });
    await this._otpRepo.save(otp);

    await this._emailService.sendEmail({
      to: email,
      subject: "Your OTP For the helixo",
      body: `Your OTP is ${otp.code}`,
    });

    return {
      otp_invalid_at: String(otp.invalidAt.getTime()),
      email,
      id: otp.id,
    };
  }
}
