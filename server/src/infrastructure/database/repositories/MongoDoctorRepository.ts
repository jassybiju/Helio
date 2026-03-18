import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { doctorModel } from "../model/DoctorModel.ts";
import { DoctorMapper } from "../../../mappers/DoctorMapper.ts";

export class MongoDoctorRepository implements IDoctorRepository {
  constructor(private readonly _loggerService: ILogger) {}

  async findByEmail(email: Email): Promise<Doctor | null> {
    try {
      this._loggerService.info("Finding Doctor with email", email);
      const doctor = await doctorModel.findOne({ email: email.value });
      if (!doctor) {
        return null;
      }
      this._loggerService.info("doctor Found", doctor);

      return DoctorMapper.toDomain(doctor);
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
      const updatedDoctor = await doctorModel.findOneAndUpdate(
        {
          id: doctor.id,
        },
        DoctorMapper.toPersistance(doctor),
        {
          new: true,
          upsert: true,
        }
      );
      this._loggerService.info(
        "Doctor Saved Successfully id : " + updatedDoctor.id
      );
    } catch (error) {
      this._loggerService.error("Failed to save doctor of email " + error);
      throw new AppError(MESSAGE.FAILED_SAVE_DOCTOR, HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findById(id: string): Promise<Doctor> {
    try {
      const doctor = await doctorModel.findById(id);

      if (!doctor) {
        throw new AppError("doctor Not Found", HTTPStatus.NOT_FOUND);
      }
      return DoctorMapper.toDomain(doctor);
    } catch (error) {
      this._loggerService.error("Failed to fetch doctor", error as Error);
      throw new AppError(
        MESSAGE.FAILED_FETCH_DOCTOR_BY_ID,
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
