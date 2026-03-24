import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { doctorModel, type DoctorDoc } from "../model/DoctorModel.ts";
import { DoctorMapper } from "../../../mappers/DoctorMapper.ts";
import { MongoBaseRepository } from "./MongoBaseRepository.ts";

export class MongoDoctorRepository
  extends MongoBaseRepository<Doctor, DoctorDoc>
  implements IDoctorRepository
{
  constructor(private readonly _loggerService: ILogger) {
    super(doctorModel);
  }

  async findByEmail(email: Email): Promise<Doctor | null> {
    try {
      this._loggerService.info("Finding Doctor with email", email);
      return await super.findOne({ email: email.value }, DoctorMapper.toDomain);
    } catch (error) {
      this._loggerService.error("Failed to fetch by email", error as Error);
      throw new AppError(
        MESSAGE.FAILED_FETCH_DOCTOR_BY_EMAIL,
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async save(doctor: Doctor): Promise<void> {
    try {
      this._loggerService.info("Saving Doctor", doctor.email);
      await super.save(doctor, doctor.id, DoctorMapper.toPersistance);
      this._loggerService.info("Doctor Saved Successfully id : " + doctor.id);
    } catch (error) {
      this._loggerService.error("Failed to save doctor of email " + error);
      throw new AppError(MESSAGE.FAILED_SAVE_DOCTOR, HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findById(id: string): Promise<Doctor | null> {
    try {
      return await super.findById(id, DoctorMapper.toDomain);
    } catch (error) {
      this._loggerService.error("Failed to fetch doctor", error as Error);
      throw new AppError(
        MESSAGE.FAILED_FETCH_DOCTOR_BY_ID,
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
