import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { Patient } from "@domain/entities/Patient.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { PatientMapper } from "../../../mappers/Patient.mapper.ts";
import { patientModel } from "../model/PatientModel.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class MongoPatientRepository implements IPatientRepository {
  constructor(private readonly _loggerService: ILogger) {}

  async findByEmail(email: Email): Promise<Patient | null> {
    try {
      this._loggerService.info("Finding Patient with email " + email);
      const patient = await patientModel.findOne({ email: email });
      this._loggerService.info("Patient Found," + patient);
      if (!patient) {
        return null;
      }
      return PatientMapper.toDomain(patient);
    } catch (error) {
      this._loggerService.error("Failed to fetch ");
      throw new AppError("Failed to fetch patient by email", 500);
    }
  }
  async save(patient: Patient): Promise<void> {
    try {
      this._loggerService.info("Saving Patient : " + patient.email);
      const updatedPatient = await patientModel.findOneAndUpdate(
        {
          email: patient.email,
        },
        PatientMapper.toPersistance(patient),
        {
          new: true,
          upsert: true,
        }
      );
      this._loggerService.info(
        "Patient Saved Successfully id : " + updatedPatient.id
      );
    } catch (error) {
      this._loggerService.error("Failed to save patient of email " + error);
      throw new AppError("Failed to save patient", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findById(id: string): Promise<Patient> {
    try {
      const patient = await patientModel.findById(id);

      if (!patient) {
        throw new AppError("Patient Not Found", HTTPStatus.NOT_FOUND);
      }
      return PatientMapper.toDomain(patient);
    } catch (error) {
      this._loggerService.error("Failed to fetch ");
      throw new AppError(
        "Failed to fetch patient by id",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
