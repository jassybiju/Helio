import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { Doctor } from "#domain/entities/Doctor.js";
import type { Email } from "#domain/value-objects/Email.js";
import type { ClientSession } from "mongoose";
export interface IDoctorFilters {
    search?: string | undefined;
    isVerified?: boolean | undefined;
    isBlocked?: boolean | undefined;
    page: number;
    limit: number;
    createdFrom?: Date | undefined;
    createdTo?: Date | undefined;
    sort: "createdAt" | "first_name";
    order: "asc" | "desc";
}
export interface IDoctorSearchQuery {
    name?: string | undefined;
    specialization?: string | undefined;
    minFee?: number | undefined;
    maxFee?: number | undefined;
    minExperienceYears?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}
export interface IDoctorRepository {
    findByEmail(email: Email): Promise<Doctor | null>;
    findById(id: string): Promise<Doctor | null>;
    create(doctor: Doctor): Promise<void>;
    update(doctor: Doctor): Promise<void>;
    findAllWithFilters(params: IDoctorFilters): Promise<{
        doctors: Doctor[];
        totalCount: number;
    }>;
    /**
     * Finds all active doctors
     */
    findAllActive(): Promise<Doctor[]>;
    countDoctors(speciailziation: string): Promise<number>;
    withSession(session: ClientSession): IDoctorRepository;
    /**
     * Search the doctor using params
     * @param params IDoctorSearchQuery
     */
    search(params: IDoctorSearchQuery): Promise<{
        doctors: Doctor[];
        totalCount: number;
    }>;
    /**
     *
     * @param query name or specialty
     */
    searchByName(query: string): Promise<Doctor[]>;
    getRegistrationAnalytics(period: BOOKING_PERIOD): Promise<IRegistrationAnalytics>;
    count(): Promise<number>;
}
export interface IRegistrationAnalytics {
    labels: string[];
    count: number[];
}
//# sourceMappingURL=IDoctorRepository.d.ts.map