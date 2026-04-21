import type {
  IDoctorFilters,
  IDoctorRepository,
} from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { doctorModel, type DoctorDoc } from "../model/DoctorModel.ts";
import { DoctorMapper } from "../../../mappers/DoctorMapper.ts";
import { BaseRepository } from "./BaseRepository.ts";
import type { QueryFilter } from "mongoose";

export class MongoDoctorRepository
  extends BaseRepository<Doctor, DoctorDoc>
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

  async create(doctor: Doctor): Promise<void> {
    try {
      this._loggerService.info("Saving Doctor", doctor.email);
      await super.create(doctor, DoctorMapper.toPersistance);
      this._loggerService.info("Doctor Saved Successfully id : " + doctor.id);
    } catch (error) {
      this._loggerService.error("Failed to save doctor of email " + error);
      throw new AppError(MESSAGE.FAILED_SAVE_DOCTOR, HTTPStatus.INTERNAL_ERROR);
    }
  }

  async update(doctor: Doctor): Promise<void> {
    try {
      this._loggerService.info("Saving Doctor", doctor.email);
      await super.update(doctor, doctor.id, DoctorMapper.toPersistance);
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

  async findAllWithFilters(
    params: IDoctorFilters
  ): Promise<{ doctors: Doctor[]; totalCount: number }> {
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

      const query: QueryFilter<DoctorDoc> = {};

      if (search) {
        query.$or = [
          { fullName: { $regex: search, $options: "i" } },
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
      console.log(
        await super.find(query, { skip, limit }, DoctorMapper.toDomain),
        query,
        skip,
        limit
      );
      const [doctors, totalCount] = await Promise.all([
        super.find(
          query,
          { skip, limit, sort: sortOption },
          DoctorMapper.toDomain
        ),
        super.count(query),
      ]);

      return { doctors, totalCount };
    } catch (error) {
      this._loggerService.error("Failed to fetch Doctor", error);
      throw new AppError("Failed to Fetch Doctor", HTTPStatus.INTERNAL_ERROR);
    }
  }
  async countDoctors(specialization: string) {
    try {
      return await doctorModel.find({ specialization }).countDocuments();
    } catch (error) {
      this._loggerService.error("failed to fetch");
      throw new AppError("Failed to Fetch", HTTPStatus.INTERNAL_ERROR);
    }
  }
}
