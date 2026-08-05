import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import { Consultation } from "#domain/entities/Consultation.js";
import { BaseRepository } from "./BaseRepository.js";
import { type ConsultationDoc } from "../model/ConsultationModel.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession } from "mongoose";
export declare class ConsultationRepository extends BaseRepository<Consultation, ConsultationDoc> implements IConsultationRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): IConsultationRepository;
    create(consultation: Consultation): Promise<void>;
    findById(id: string): Promise<Consultation | null>;
    findByAppointmentId(appointmentId: string): Promise<Consultation | null>;
    update(consultation: Consultation): Promise<void>;
    findPatientHistory(patientId: string, page?: number, limit?: number, excludeConsultationId?: string): Promise<Consultation[]>;
    countAllPatientHistory(patientId: string): Promise<number>;
    findLatestPatientConsultation(patientId: string, excludeConsultationId?: string): Promise<Consultation | null>;
}
//# sourceMappingURL=ConsultationRepository.d.ts.map