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

export class DoctorShiftRepository
  extends BaseRepository<DoctorShift, DoctorShiftDoc>
  implements IDoctorShiftRepository
{
  constructor(private readonly _loggerService: ILogger) {
    super(doctorShiftModel);
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
  async findByDoctorAndDay(
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

  async save(shift: DoctorShift): Promise<void> {
    try {
      this._loggerService.error("Saving Doctor Shift ", shift.shiftId);

      await super.save(shift, shift.shiftId, DoctorShiftMapper.toPersistance);

      this._loggerService.error("SavedDoctor Shift ", shift.shiftId);
    } catch (error) {
      this._loggerService.error("Failed to Save ", error as Error);

      throw new AppError(
        "Failed to save Doctor Shifts",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
