import type { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { Patient } from "#domain/entities/Patient.js";
import type { Email } from "#domain/value-objects/Email.js";
import type { ClientSession } from "mongoose";
export interface IPatientFilters {
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
export interface IPatientRepository {
    withSession(session: ClientSession): IPatientRepository;
    findByEmail(email: Email): Promise<Patient | null>;
    findById(id: string): Promise<Patient | null>;
    create(patient: Patient): Promise<void>;
    update(patient: Patient): Promise<void>;
    findAllWithFilters(params: IPatientFilters): Promise<{
        patients: Patient[];
        totalCount: number;
    }>;
    findByIds(ids: string[]): Promise<Patient[]>;
    getRegistrationAnalytics(period: BOOKING_PERIOD): Promise<IRegistrationAnalytics>;
    count(): Promise<number>;
}
export interface IRegistrationAnalytics {
    labels: string[];
    count: number[];
}
//# sourceMappingURL=IPatientRepository.d.ts.map