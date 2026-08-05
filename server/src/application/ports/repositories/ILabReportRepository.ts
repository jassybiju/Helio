import type { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
import type { LabReport } from "#domain/entities/LabReport.js";
import type { ClientSession } from "mongoose";

export interface ILabReportRepository {
  withSession(session: ClientSession): ILabReportRepository;
  create(labReport: LabReport): Promise<void>;

  findById(id: string): Promise<LabReport | null>;

  findByAppointmentId(appointmentId: string): Promise<LabReport[]>;

  findByConsultationId(consultationId: string): Promise<LabReport[]>;

  findByPatient(
    patientId: string,
    page: number,
    limit: number,
    status?: LAB_REPORT_STATUS[]
  ): Promise<{
    reports: LabReport[];
    totalCount: number;
  }>;

  findRequestedByPatient(patientId: string): Promise<LabReport[]>;
  update(labReport: LabReport): Promise<void>;

  delete(id: string): Promise<void>;
}
