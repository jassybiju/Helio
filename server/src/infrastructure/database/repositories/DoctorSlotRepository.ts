import type {
  IDoctorSlotFilters,
  IDoctorSlotRepository,
} from "@application/ports/repositories/IDoctorSlotRepository.ts";
import type { DoctorSlot } from "@domain/entities/DoctorSlot.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  doctorSlotModel,
  type DoctorSlotDoc,
} from "../model/DoctorSlotModel.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { DoctorSlotMapper } from "../../../mappers/DoctorSlotMapper.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { startSession, type ClientSession, type QueryFilter } from "mongoose";

export class DoctorSlotRepository
  extends BaseRepository<DoctorSlot, DoctorSlotDoc>
  implements IDoctorSlotRepository
{
  constructor(
    private readonly _logger: ILogger,
    session: ClientSession | null = null
  ) {
    super(doctorSlotModel, session);
  }

  withSession(session: ClientSession) {
    return new DoctorSlotRepository(this._logger, session);
  }

  async findByDoctor(doctorId: string): Promise<DoctorSlot[]> {
    try {
      this._logger.info("Fetching Slot by Doctor", { doctorId });

      return await super.find(
        { doctor_id: doctorId },
        {},
        DoctorSlotMapper.toDomain
      );
    } catch (error) {
      this._logger.error("Error Fetching Slot by Doctor", { doctorId });
      throw new AppError(
        "Error Fetching Slot by Doctor",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async findAllWithFilters(
    doctorId: string,
    params: IDoctorSlotFilters
  ): Promise<{ slots: DoctorSlot[]; totalCount: number }> {
    try {
      this._logger.info("Fetching Slot by Filters and Doctor Id", {
        doctorId,
        params,
      });

      const { page, limit = 0, dateFrom, dateTo, sort, order } = params;

      const query: QueryFilter<DoctorSlotDoc> = { doctor_id: doctorId };

      if (dateFrom || dateTo) {
        query.start_time = {};
        if (dateFrom) query.start_time.$gte = dateFrom;
        if (dateTo) query.start_time.$lte = dateTo;
      }

      const skip = (page - 1) * (limit ? limit : 0);
      const sortOptions: Record<string, 1 | -1> = {
        [sort]: order === "asc" ? 1 : -1,
      };

      const [slots, totalCount] = await Promise.all([
        super.find(
          query,
          { sort: sortOptions, skip, limit },
          DoctorSlotMapper.toDomain
        ),
        super.count(query),
      ]);
      console.log(slots, query);
      return { slots, totalCount };
    } catch (error) {
      console.log(error);
      this._logger.error("Error Fetching doctorslots with filter", {
        doctorId,
        params,
        error,
      });
      throw new AppError(
        "Error Fetching doctorslots with filter",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async create(slot: DoctorSlot): Promise<void> {
    try {
      this._logger.info("Saving Slot ", { slot });

      await super.create(slot, DoctorSlotMapper.toPersistance);
      this._logger.info("Saved Slot ", { slot });
    } catch (error) {
      this._logger.error("Error saving Slot ", { slot, error });
      throw new AppError(
        "Error Saving doctorslots ",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async bulkInsert(slots: DoctorSlot[]): Promise<void> {
    try {
      await super.insertMany(slots, DoctorSlotMapper.toPersistance);
      this._logger.info("Saved Slots ", { slots });
    } catch (error) {
      this._logger.error("Error Saving slots", { error });
      throw new AppError("Error Saving DoctorSlots", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findAllByDoctorAndDay(doctorId: string, date: Date): Promise<DoctorSlot[]> {
    try{
      this._logger.info("Fetching Doctor Sltos", {doctorId, date})
      let startTime = new Date(date).setHours(0,0,0,0)
      let endTime = new Date(date).setHours(24, 60,60,1000)
      return await super.find({doctorId, start_time : {$gte : startTime, $lte : endTime}},{},DoctorSlotMapper.toDomain)
    }catch(error){
      this._logger.error("Error fetching",{error, doctorId, date})
      throw new AppError("Error Fetching DoctorSlots", HTTPStatus.INTERNAL_ERROR);

    }
  }
}
