import { LabReport } from "@domain/entities/LabReport.ts";
import type { LabReportDoc } from "@infrastructure/database/model/LabReportModel.ts";

export class LabReportMapper {
  static toDomain(raw: LabReportDoc): LabReport {
    return new LabReport(
      raw._id,
      raw.consultation_id,
      raw.appointment_id,
      raw.doctor_id,
      raw.patient_id,
      raw.test_name,
      raw.instructions ?? null,
      raw.status,
      raw.document_key ?? null,
      raw.remarks ?? null,
      raw.requested_at,
      raw.uploaded_at ?? null,
      raw.created_at ?? null,
      raw.updated_at ?? null
    );
  }

  static toPersistance(domain: LabReport): LabReportDoc {
    return {
      _id: domain.id,
      consultation_id: domain.consultationId,
      appointment_id: domain.appointmentId,
      doctor_id: domain.doctorId,
      patient_id: domain.patientId,
      test_name: domain.testName,
      instructions: domain.instructions,
      status: domain.status,
      document_key: domain.documentKey,
      remarks: domain.remarks,
      requested_at: domain.requestedAt,
      uploaded_at: domain.uploadedAt,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      is_deleted: false,
    };
  }
}
