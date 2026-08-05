import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { LabReport } from "#domain/entities/LabReport.js";
import { BaseRepository } from "./BaseRepository.js";
import { type LabReportDoc } from "../model/LabReportModel.js";
import type { ClientSession } from "mongoose";
import type { ILogger } from "#application/ports/services/ILogger.js";
import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export declare class LabReportRepository extends BaseRepository<LabReport, LabReportDoc> implements ILabReportRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): ILabReportRepository;
    create(labReport: LabReport): Promise<void>;
    update(labReport: LabReport): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<LabReport | null>;
    findByAppointmentId(appointmentId: string): Promise<LabReport[]>;
    findByConsultationId(consultationId: string): Promise<LabReport[]>;
    findRequestedByPatient(patientId: string): Promise<LabReport[]>;
    findByPatient(patientId: string, page?: number, limit?: number, status?: LAB_REPORT_STATUS[]): Promise<{
        reports: LabReport[];
        totalCount: number;
    }>;
}
//# sourceMappingURL=LabReportRepository.d.ts.map