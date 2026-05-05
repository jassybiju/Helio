import type {
  IDoctorFilters,
  IDoctorRepository,
  IDoctorSearchQuery,
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
import type { ClientSession, QueryFilter } from "mongoose";
import { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";

export class MongoDoctorRepository
  extends BaseRepository<Doctor, DoctorDoc>
  implements IDoctorRepository
{
  constructor(
    private readonly _loggerService: ILogger,
    session: ClientSession | null = null
  ) {
    super(doctorModel, session);
  }

  withSession(session: ClientSession) {
    return new MongoDoctorRepository(this._loggerService, session);
  }

  async findByEmail(email: Email): Promise<Doctor | null> {
    this._loggerService.info("Finding Doctor with email", email);
    return await super.findOne({ email: email.value }, DoctorMapper.toDomain);
  }

  async create(doctor: Doctor): Promise<void> {
    this._loggerService.info("Saving Doctor", doctor.email);
    await super.create(doctor, DoctorMapper.toPersistance);
    this._loggerService.info("Doctor Saved Successfully id : " + doctor.id);
  }

  async update(doctor: Doctor): Promise<void> {
    this._loggerService.info("Saving Doctor", doctor.email);
    await super.update(doctor, doctor.id, DoctorMapper.toPersistance);
    this._loggerService.info("Doctor Saved Successfully id : " + doctor.id);
  }

  async findById(id: string): Promise<Doctor | null> {
    return await super.findById(id, DoctorMapper.toDomain);
  }

  async findAllWithFilters(
    params: IDoctorFilters
  ): Promise<{ doctors: Doctor[]; totalCount: number }> {
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
    const [doctors, totalCount] = await Promise.all([
      super.find(
        query,
        { skip, limit, sort: sortOption },
        DoctorMapper.toDomain
      ),
      super.count(query),
    ]);

    return { doctors, totalCount };
  }

  async countDoctors(specialization: string) {
    return await doctorModel.find({ specialization }).countDocuments();
  }

  async findAllActive(): Promise<Doctor[]> {
    return await super.find(
      {
        is_blocked: false,
        verification_status: "approved",
        is_deleted: false,
      },
      {},
      DoctorMapper.toDomain
    );
  }

  async search(
    params: IDoctorSearchQuery
  ): Promise<{ doctors: Doctor[]; totalCount: number }> {
    this._loggerService.info("Fetching Doctors", { params });

    const {
      name,
      specialization,
      minFee,
      maxFee,
      minExperienceYears,
      page = 1,
      limit = 10,
    } = params;

    const query: QueryFilter<DoctorDoc> = {
      is_deleted: false,
      is_blocked: false,
      is_verified: true,
      verification_status: DOCTOR_VERIFICATION_STATUS.APPROVED,
    };

    if (name) {
      query.full_name = { $regex: name, $options: "i" };
    }

    if (specialization) {
      query.specialization = { $regex: specialization, $options: "i" };
    }

    if (minFee !== undefined || maxFee !== undefined) {
      query.$or = [
        {
          online_fee: {
            ...(minFee !== undefined && { $gte: minFee }),
            ...(maxFee !== undefined && { $lte: maxFee }),
          },
        },
        {
          clinic_fee: {
            ...(minFee !== undefined && { $gte: minFee }),
            ...(maxFee !== undefined && { $lte: maxFee }),
          },
        },
      ];
    }

    if (minExperienceYears !== undefined) {
      const currentYear = new Date().getFullYear();

      query.career_start_year = {
        $lte: currentYear - minExperienceYears,
      };
    }

    const skip = (page - 1) * limit;

    const [doctors, totalCount] = await Promise.all([
      super.find(query, { skip, limit }, DoctorMapper.toDomain),

      super.count(query),
    ]);

    return {
      doctors,
      totalCount,
    };
  }
}
