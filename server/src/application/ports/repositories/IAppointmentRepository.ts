import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import type { ClientSession } from "mongoose";

export interface IAppointmentRepository {
  /**
   * Creates appointment
   * @param appointment Appintment Instance
   */
  create(appointment: Appointment): Promise<void>;

  update(appointment: Appointment): Promise<void>;

  findById(id: string): Promise<Appointment | null>;

  withSession(session: ClientSession): IAppointmentRepository;

  countOccupiedSlots(
    doctorId: string,
    startTime: Date,
    type: CONSULTATION_TYPE
  ): Promise<number>;

  findExistingPatientAppointment(
    patientId: string,
    doctorId: string,
    startTime: Date
  ): Promise<Appointment | null>;

  findActiveInRange(
    doctorId: string,
    start: Date,
    end: Date
  ): Promise<Appointment[]>;

  expirePendingAppointments(): Promise<void>;
}
