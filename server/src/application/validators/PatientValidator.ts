import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class PatientValidator {
  constructor(private readonly _patientRepo: IPatientRepository) {}

  async ensureEmailAvailable(email: string) {
    const patient = await this._patientRepo.findByEmail(new Email(email));
    if (patient && patient.isVerified) {
      throw new AppError("Email Already Exists", HTTPStatus.BAD_REQUEST);
    }

    return patient;
  }
}
