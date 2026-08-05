import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { DoctorShift } from "#domain/entities/DoctorShift.js";
import { type DoctorShiftDoc } from "../model/DoctorShiftModel.js";
import type { DAY_OF_WEEK } from "#domain/common/enums/doctorShift.enum.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession } from "mongoose";
export declare class DoctorShiftRepository extends BaseRepository<DoctorShift, DoctorShiftDoc> implements IDoctorShiftRepository {
    private readonly _loggerService;
    constructor(_loggerService: ILogger, session?: ClientSession | null);
    withSession(session: ClientSession): DoctorShiftRepository;
    findById(id: string): Promise<DoctorShift | null>;
    findByDoctor(doctorId: string): Promise<DoctorShift[]>;
    findAllByDoctorId(id: string): Promise<DoctorShift[]>;
    findAllByDoctorAndDay(doctorId: string, day: DAY_OF_WEEK): Promise<DoctorShift[]>;
    create(shift: DoctorShift): Promise<void>;
    update(shift: DoctorShift): Promise<void>;
    delete(shiftId: string): Promise<void>;
    findByDoctorIds(doctorIds: string[]): Promise<DoctorShift[]>;
    bulkInsert(shifts: DoctorShift[]): Promise<void>;
}
//# sourceMappingURL=DoctorShiftRepository.d.ts.map