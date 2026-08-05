import type { IPatientFilters, IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession } from "mongoose";
import { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";
import { type PatientDoc } from "../model/PatientModel.js";
import { BaseRepository } from "./BaseRepository.js";
import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
export declare class PatientRepository extends BaseRepository<Patient, PatientDoc> implements IPatientRepository {
    private readonly _loggerService;
    constructor(_loggerService: ILogger, session?: ClientSession);
    withSession(session: ClientSession): PatientRepository;
    findByIds(ids: string[]): Promise<Patient[]>;
    /**
     *  Fetches Patient by email
     * @param email Email ValueObject
     * @returns returns patient or null
     */
    findByEmail(email: Email): Promise<Patient | null>;
    /**
     * Saves the Patient to DB
     * @param patient Patient entity
     *
     */
    create(patient: Patient): Promise<void>;
    update(patient: Patient): Promise<void>;
    /**
     * Fetches patient by id
     *
     * @param id
     * @returns Patient Entity
     */
    findById(id: string): Promise<Patient | null>;
    /**
     *
     * @param params have type IPatientFilters used for filter criteria
     */
    findAllWithFilters(params: IPatientFilters): Promise<{
        patients: Patient[];
        totalCount: number;
    }>;
    getRegistrationAnalytics(period: BOOKING_PERIOD): Promise<{
        labels: string[];
        count: number[];
    }>;
    count(): Promise<number>;
}
//# sourceMappingURL=MongoPatientRepository.d.ts.map