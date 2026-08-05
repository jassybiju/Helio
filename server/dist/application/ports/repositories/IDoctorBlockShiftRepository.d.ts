import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import type { ClientSession } from "mongoose";
export interface IDoctorBlockShiftRepository {
    withSession(session: ClientSession): IDoctorBlockShiftRepository;
    findByDate(doctorId: string, date: Date): Promise<DoctorBlockShift[]>;
    findByDoctor(doctorId: string): Promise<DoctorBlockShift[]>;
    create(blockShift: DoctorBlockShift): Promise<void>;
    findByDoctorFromRange(doctorId: string, startDate: Date, endDate: Date): Promise<DoctorBlockShift[]>;
    findById(id: string): Promise<DoctorBlockShift | null>;
    update(blockShift: DoctorBlockShift): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IDoctorBlockShiftRepository.d.ts.map