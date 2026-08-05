import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import { BaseRepository } from "./BaseRepository.js";
import { type BlockShiftDoc } from "../model/BlockShiftModel.js";
import type { ClientSession } from "mongoose";
export declare class DoctorBlockShiftRepository extends BaseRepository<DoctorBlockShift, BlockShiftDoc> implements IDoctorBlockShiftRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): IDoctorBlockShiftRepository;
    findByDoctorFromRange(doctorId: string, startDate: Date, endDate: Date): Promise<DoctorBlockShift[]>;
    findByDate(doctorId: string, date: Date): Promise<DoctorBlockShift[]>;
    create(blockShift: DoctorBlockShift): Promise<void>;
    findByDoctor(doctorId: string): Promise<DoctorBlockShift[]>;
    findById(id: string): Promise<DoctorBlockShift | null>;
    update(blockShift: DoctorBlockShift): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=DoctorBlockShiftRepository.d.ts.map