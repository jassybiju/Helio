import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { Patient } from "@domain/entities/Patient.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { PatientMapper } from "../../../mappers/PatientMapper.ts";
import { patientModel, type PatientDoc } from "../model/PatientModel.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { MongoBaseRepository } from "./MongoBaseRepository.ts";

export class MongoPatientRepository
  extends MongoBaseRepository<Patient, PatientDoc>
  implements IPatientRepository
{
  constructor(private readonly _loggerService: ILogger) {
    super(patientModel);
  }

  /**
   *  Fetches Patient by email
   * @param email Email ValueObject
   * @returns returns patient or null
   */
  async findByEmail(email: Email): Promise<Patient | null> {
    try {
      this._loggerService.info("Finding Patient with email ", email);
      return await super.findOne(
        { email: email.value },
        PatientMapper.toDomain
      );
    } catch (error) {
      this._loggerService.error("Failed to fetch ", error as Error);
      throw new AppError("Failed to fetch patient by email", 500);
    }
  }

  /**
   * Saves the Patient to DB
   * @param patient Patient entity
   *
   */
  async save(patient: Patient): Promise<void> {
    try {
      this._loggerService.info("Saving Patient : " + patient.email);
      await super.save(patient, patient.id, PatientMapper.toPersistance);
      this._loggerService.info("Patient Saved Successfully id : " + patient.id);
    } catch (error) {
      this._loggerService.error("Failed to save patient of email ", error);
      throw new AppError("Failed to save patient", HTTPStatus.INTERNAL_ERROR);
    }
  }

  /**
   * Fetches patient by id
   *
   * @param id
   * @returns Patient Entity
   */
  async findById(id: string): Promise<Patient | null> {
    try {
      return await super.findById(id, PatientMapper.toDomain);
    } catch (error) {
      this._loggerService.error("Failed to fetch ", error as Error);
      throw new AppError(
        "Failed to fetch patient by id",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
