import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import { BaseRepository } from "./BaseRepository.ts";
import { DoctorShift } from "@domain/entities/DoctorShift.ts";
import {
  doctorShiftModel,
  type DoctorShiftDoc,
} from "../model/DoctorShiftModel.ts";
import type { DAY_OF_WEEK } from "@domain/common/enums/doctorShift.enum.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AppError } from "@shared/errors/AppError.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { DoctorShiftMapper } from "../../../mappers/DoctorShiftMapper.ts";
import type { ClientSession, QueryFilter } from "mongoose";

export class DoctorShiftRepository
  extends BaseRepository<DoctorShift, DoctorShiftDoc>
  implements IDoctorShiftRepository
{
  constructor(
    private readonly _loggerService: ILogger,
    session: ClientSession | null = null
  ) {
    super(doctorShiftModel, session);
  }
  withSession(session: ClientSession) {
    return new DoctorShiftRepository(this._loggerService, session);
  }

  async findById(id: string): Promise<DoctorShift | null> {
    try {
      this._loggerService.info("Fetching shift by id ", { id });
      return await super.findById(id, DoctorShiftMapper.toDomain);
    } catch (error) {
      this._loggerService.error("Failed to fetch ", error as Error);

      throw new AppError(
        "Failed to Fetch Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async findByDoctor(doctorId: string): Promise<DoctorShift[]> {
    try {
      this._loggerService.info("Fetching shift by doctorId", { doctorId });

      return await super.find(
        { doctor_id: doctorId },
        { sort: { day_of_week: 1 } },
        DoctorShiftMapper.toDomain
      );
    } catch (error) {
      this._loggerService.error("Failed to fetch ", error as Error);

      throw new AppError(
        "Failed to Fetch Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async findAllByDoctorId(id: string): Promise<DoctorShift[]> {
    try {
      return await super.find(
        { doctor_id: id },
        {},
        DoctorShiftMapper.toDomain
      );
    } catch (error) {
      this._loggerService.error("Falied To Fetch", error);
      throw new AppError(
        "failed to fetch doctor shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async findAllByDoctorAndDay(
    doctorId: string,
    day: DAY_OF_WEEK
  ): Promise<DoctorShift[]> {
    try {
      this._loggerService.info("Fetching Shift by Doctor and day", {
        doctorId,
        day,
      });

      return await super.find(
        { doctor_id: doctorId, day_of_week: day },
        {},
        DoctorShiftMapper.toDomain
      );
    } catch (error) {
      this._loggerService.error("Failed to fetch ", error as Error);

      throw new AppError(
        "Failed to Fetch Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async create(shift: DoctorShift): Promise<void> {
    try {
      this._loggerService.info("Saving Doctor Shift ", shift.shiftId);

      await super.create(shift, DoctorShiftMapper.toPersistance);

      this._loggerService.error("SavedDoctor Shift ", shift.shiftId);
    } catch (error) {
      this._loggerService.error("Failed to Save ", error as Error);

      throw new AppError(
        "Failed to save Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async update(shift: DoctorShift): Promise<void> {
    try {
      this._loggerService.info("Saving Doctor Shift ", shift.shiftId);

      await super.update(shift, shift.shiftId, DoctorShiftMapper.toPersistance);

      this._loggerService.error("SavedDoctor Shift ", shift.shiftId);
    } catch (error) {
      this._loggerService.error("Failed to Save ", error as Error);

      throw new AppError(
        "Failed to save Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async delete(shiftId: string): Promise<void> {
    try {
      this._loggerService.info("Deleting Doctor Shift", { shiftId });

      await super.delete(shiftId);
    } catch (error) {
      this._loggerService.error("Failed to delete", error as Error);
      throw new AppError(
        "Failed to Delete Doctor Shift",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async findByDoctorIds(doctorIds: string[]): Promise<DoctorShift[]> {
    try {
      this._loggerService.info("Fetching Shift by DoctorIds", {
        doctorIds,
      });

      const query: QueryFilter<DoctorShiftDoc> = {
        doctor_id: { $in: doctorIds },
      };

      return await super.find(query, {}, DoctorShiftMapper.toDomain);
    } catch (error) {
      this._loggerService.error("Failed to fetch ", error as Error);

      throw new AppError(
        "Failed to Fetch Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async bulkInsert(shifts: DoctorShift[]): Promise<void> {
    try {
      this._loggerService.info("Saving doctorShifts", { shifts });
      await super.insertMany(shifts, DoctorShiftMapper.toPersistance);
    } catch (error) {
      this._loggerService.error("Failer to saves shifts", { shifts, error });

      throw new AppError(
        "Failed to Save Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
