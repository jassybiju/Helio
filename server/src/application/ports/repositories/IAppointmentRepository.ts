import type { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import type { ClientSession } from "mongoose";

export type DoctorAppointmentListItem = {
  appointment: Appointment;

  patientName: string;

  doctorName: string;
};

export type FindAppointmentsFilter = {
  doctorId?: string;
  patientId?: string;

  patientSearch?: string | null;
  doctorSearch?: string | null;

  status?: APPOINTMENT_STATUS | null;
  statuses?: APPOINTMENT_STATUS[] | null;
  consultationType?: CONSULTATION_TYPE | null;

  startDate?: Date | null;
  endDate?: Date | null;

  page?: number;
  limit?: number;

  sort?: Record<string, 1 | -1>;
  order?: "asc" | "desc";
};

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

  findManyWithFilters(filters: FindAppointmentsFilter): Promise<{
    appointments: DoctorAppointmentListItem[];
    totalCount: number;
  }>;

  findOngoingAppointmentByDoctor(doctorId: string): Promise<Appointment | null>;

  findNextQueueAppointment(
    doctorId: string,
    date: Date
  ): Promise<Appointment | null>;

  countAllAppointmentbyDoctorId(doctorId: string): Promise<number>;

  /**
   *
   * @param filters Filter object NOTE Date is in UTC
   * @returns
   */
  findDoctorAppointmentForRange(
    doctorId: string,
    startTime: Date,
    endTime: Date
  ): Promise<Appointment[]>;

  findActiveQueueByDoctorAndTime(
    doctorId: string,
    startTime: Date
  ): Promise<Appointment[]>;

  findAllWithFilters(
    filters: FindAppointmentsFilter
  ): Promise<DoctorAppointmentListItem[]>;
}
