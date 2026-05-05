import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  blockShiftModel,
  type BlockShiftDoc,
} from "../model/BlockShiftModel.ts";
import { DoctorBlockShiftMapper } from "../../../mappers/DoctorBlockShiftMapper.ts";

export class DoctorBlockShiftRepository
  extends BaseRepository<DoctorBlockShift, BlockShiftDoc>
  implements IDoctorBlockShiftRepository
{
  constructor(private readonly _logger: ILogger) {
    super(blockShiftModel);
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
    console.log(startTime, endTime, 112);
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
    const startDate = new Date().setHours(0, 0, 0, 0);
    return await super.find(
      { doctor_id: doctorId, start_time: { $gte: startDate } },
      {},
      DoctorBlockShiftMapper.toDomain
    );
  }
}
