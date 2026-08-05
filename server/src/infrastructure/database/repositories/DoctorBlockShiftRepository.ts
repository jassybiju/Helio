import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import { BaseRepository } from "./BaseRepository.js";
import {
  blockShiftModel,
  type BlockShiftDoc,
} from "../model/BlockShiftModel.js";
import { DoctorBlockShiftMapper } from "../../../mappers/DoctorBlockShiftMapper.js";
import type { ClientSession } from "mongoose";
import { istToUtc } from "#shared/utils/date.utils.js";

export class DoctorBlockShiftRepository
  extends BaseRepository<DoctorBlockShift, BlockShiftDoc>
  implements IDoctorBlockShiftRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(blockShiftModel, session);
  }

  withSession(session: ClientSession): IDoctorBlockShiftRepository {
    return new DoctorBlockShiftRepository(this._logger, session);
  }
  async findByDoctorFromRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DoctorBlockShift[]> {
    this._logger.info("Fetching Blocks Shift by Start and end Date", {
      startDate,
      endDate,
      doctorId,
    });
    const startTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endTime = new Date(endDate).setHours(23, 59, 59, 999);
    return await super.find(
      { doctor_id: doctorId, start_time: { $gte: startTime, $lte: endTime } },
      {},
      DoctorBlockShiftMapper.toDomain
    );
  }

  async findByDate(doctorId: string, date: Date): Promise<DoctorBlockShift[]> {
    this._logger.info("Fetching Blocks Shift by Start and end Date", {
      date,
      doctorId,
    });

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);

    endDate.setHours(23, 59, 59, 999);
    return (await super.find(
      { doctor_id: doctorId, start_time: { $gte: startDate, $lte: endDate } },
      {},
      DoctorBlockShiftMapper.toDomain
    )) as DoctorBlockShift[];
  }

  async create(blockShift: DoctorBlockShift) {
    await super.create(blockShift, DoctorBlockShiftMapper.toPersistance);
  }

  async findByDoctor(doctorId: string): Promise<DoctorBlockShift[]> {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    return await super.find(
      { doctor_id: doctorId, start_time: { $gte: istToUtc(startDate) } },
      {},
      DoctorBlockShiftMapper.toDomain
    );
  }

  async findById(id: string) {
    return await super.findById(id, DoctorBlockShiftMapper.toDomain);
  }

  async update(blockShift: DoctorBlockShift) {
    return await super.update(
      blockShift,
      blockShift.id,
      DoctorBlockShiftMapper.toPersistance
    );
  }

  async delete(id: string) {
    return await super.delete(id);
  }
}
