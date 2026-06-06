import type { Consultation } from "@domain/entities/Consultation.ts";
import type { ClientSession } from "mongoose";

export interface IConsultationRepository {
  withSession(session: ClientSession): IConsultationRepository;
  create(consultation: Consultation): Promise<void>;

  findById(id: string): Promise<Consultation | null>;

  findByAppointmentId(appointmentId: string): Promise<Consultation | null>;

  update(consultation: Consultation): Promise<void>;
  findPatientHistory(
    patientId: string,
    page: number,
    limit: number,
    excludeConsultationId?: string
  ): Promise<Consultation[]>;

  findLatestPatientConsultation(
    patientId: string,
    excludeConsultationId?: string
  ): Promise<Consultation | null>;
}
