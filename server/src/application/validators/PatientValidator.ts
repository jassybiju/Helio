import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class PatientValidator {
  constructor(
    private readonly _patientRepo: IPatientRepository,
    private readonly _passwordService: IPasswordService
  ) {}

  async ensureEmailAvailable(email: string) {
    const patient = await this._patientRepo.findByEmail(new Email(email));
    if (patient && patient.isVerified) {
      throw new AppError("Email Already Exists", HTTPStatus.BAD_REQUEST);
    }

    return patient;
  }

  /**
   * Checks if the password is valid for the patient
   * @param patient Patient Entity
   * @param password Password to validate with the hash
   */
  async validatePatientPassword(patient: Patient, password: string) {
    if (
      !(await this._passwordService.compare(password, patient.passwordHashed!))
    ) {
      throw new AppError("Invalid Email or Passwordss", HTTPStatus.BAD_REQUEST);
    }
  }

  // more validate classes
}
