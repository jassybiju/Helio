import type {
  IPatientFilters,
  IPatientRepository,
} from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession, QueryFilter } from "mongoose";
import { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { PatientMapper } from "../../../mappers/PatientMapper.js";
import { patientModel, type PatientDoc } from "../model/PatientModel.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { BaseRepository } from "./BaseRepository.js";
import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";

export class PatientRepository
  extends BaseRepository<Patient, PatientDoc>
  implements IPatientRepository
{
  constructor(
    private readonly _loggerService: ILogger,
    session?: ClientSession
  ) {
    super(patientModel, session);
  }

  withSession(session: ClientSession) {
    return new PatientRepository(this._loggerService, session);
  }

  findByIds(ids: string[]): Promise<Patient[]> {
    return super.find({ _id: { $in: ids } }, {}, PatientMapper.toDomain);
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
  async create(patient: Patient): Promise<void> {
    try {
      this._loggerService.info("Saving Patient : " + patient.email, patient);
      await super.create(patient, PatientMapper.toPersistance);
      this._loggerService.info("Patient Saved Successfully id : " + patient.id);
    } catch (error) {
      this._loggerService.error("Failed to save patient of email ", error);
      throw new AppError("Failed to save patient", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async update(patient: Patient): Promise<void> {
    try {
      this._loggerService.info("Saving Patient : " + patient.email, patient);
      await super.update(patient, patient.id, PatientMapper.toPersistance);
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

  /**
   *
   * @param params have type IPatientFilters used for filter criteria
   */
  async findAllWithFilters(
    params: IPatientFilters
  ): Promise<{ patients: Patient[]; totalCount: number }> {
    try {
      const {
        search,
        isVerified,
        isBlocked,
        page,
        limit,
        createdFrom,
        createdTo,
        sort,
        order,
      } = params;
      const query: QueryFilter<PatientDoc> = {};

      if (search) {
        query.$or = [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ];
      }

      if (isVerified !== undefined) {
        query.is_verified = isVerified;
      }

      if (isBlocked !== undefined) {
        query.is_blocked = isBlocked;
      }

      if (createdFrom || createdTo) {
        query.createdAt = {};
        if (createdFrom) query.createdAt.$gte = createdFrom;
        if (createdTo) query.createdAt.$lte = createdTo;
      }

      const skip = (page - 1) * limit;
      const sortOption: Record<string, 1 | -1> = {
        [sort]: order === "asc" ? 1 : -1,
      };

      const [patients, totalCount] = await Promise.all([
        super.find(
          query,
          { skip, limit, sort: sortOption },
          PatientMapper.toDomain
        ),
        super.count(query),
      ]);

      return { patients, totalCount };
    } catch (error) {
      this._loggerService.error("Failed to fetch patients", error as Error);
      throw new AppError("Failed to fetch patients", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async getRegistrationAnalytics(period: BOOKING_PERIOD) {
    return super.getRegistrationAnalytics(period);
  }

  async count() {
    return super.count({});
  }
}
