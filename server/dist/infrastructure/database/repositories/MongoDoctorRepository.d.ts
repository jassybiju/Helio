import type { IDoctorFilters, IDoctorRepository, IDoctorSearchQuery } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { Doctor } from "#domain/entities/Doctor.js";
import type { Email } from "#domain/value-objects/Email.js";
import { type DoctorDoc } from "../model/DoctorModel.js";
import { BaseRepository } from "./BaseRepository.js";
import type { ClientSession } from "mongoose";
import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
export declare class MongoDoctorRepository extends BaseRepository<Doctor, DoctorDoc> implements IDoctorRepository {
    private readonly _loggerService;
    constructor(_loggerService: ILogger, session?: ClientSession | null);
    withSession(session: ClientSession): MongoDoctorRepository;
    findByEmail(email: Email): Promise<Doctor | null>;
    create(doctor: Doctor): Promise<void>;
    update(doctor: Doctor): Promise<void>;
    findById(id: string): Promise<Doctor | null>;
    findAllWithFilters(params: IDoctorFilters): Promise<{
        doctors: Doctor[];
        totalCount: number;
    }>;
    countDoctors(specialization: string): Promise<number>;
    findAllActive(): Promise<Doctor[]>;
    searchByName(query: string): Promise<Doctor[]>;
    search(params: IDoctorSearchQuery): Promise<{
        doctors: Doctor[];
        totalCount: number;
    }>;
    getRegistrationAnalytics(period: BOOKING_PERIOD): Promise<{
        labels: string[];
        count: number[];
    }>;
    count(): Promise<number>;
}
//# sourceMappingURL=MongoDoctorRepository.d.ts.map