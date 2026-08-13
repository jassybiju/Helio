import type {
  APPOINTMENT_STATUS,
  BOOKING_PERIOD,
} from "#domain/common/enums/appointment.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { Appointment } from "#domain/entities/Appointment.js";
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

export interface PatientLatestVitals {
  appointment: Appointment;
  vitals: {
    bloodPressure: string | null;
    oxygenLevel: number | null;
    heartRate: number | null;
    temperature: number | null;
    weight: number | null;
    height: number | null;
  };
}

export interface IActiveMedication {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  consultationType: CONSULTATION_TYPE;

  startedAt: Date;
  endedAt: Date | null;
  medicationPeriod: number | null;

  prescriptions: {
    name: string;
    foodTiming: number;
    timings: {
      morning: boolean;
      afternoon: boolean;
      night: boolean;
    };
    durationInDays: number;
    instructions: string | null;
  }[];
}

export interface IAppointmentRepository {
  /**
   * Creates appointment
   * @param appointment Appintment Instance
   */
  create(appointment: Appointment): Promise<void>;

  update(appointment: Appointment): Promise<void>;

  findById(id: string): Promise<Appointment | null>;

  withSession(session: ClientSession): IAppointmentRepository;

  getDoctorBookingTrend(
    doctorId: string,
    period: BOOKING_PERIOD
  ): Promise<{ label: string; count: number }[]>;

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
  ): Promise<Appointment[]>;

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

  countAppointmentWithPatientAndDoctor(
    patientId: string,
    doctorId: string
  ): Promise<number>;

  countCompletedAppointments(
    patientId: string,
    doctorId: string
  ): Promise<number>;

  getDashboardStatistics(
    period: BOOKING_PERIOD
  ): Promise<IAppointmentDashboardStatistics>;

  getDoctorAppointmentStatusDistribution(doctorId: string): Promise<{
    totalAppointments: number;
    appointmentStatusDistribution: {
      confirmed: number;
      ongoing: number;
      completed: number;
      cancelled: number;
      noShow: number;
      expired: number;
    };
  }>;

  getLatestCompletedAppointmentWithVitals(
    patientId: string
  ): Promise<PatientLatestVitals | null>;

  getActiveMedications(patientId: string): Promise<IActiveMedication[]>;
}

export interface IAppointmentDashboardStatistics {
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  todayAppointments: number;

  appointmentAnalytics: {
    label: string;
    count: number;
  }[];

  appointmentStatusDistribution: {
    confirmed: number;
    ongoing: number;
    completed: number;
    cancelled: number;
    noShow: number;
    expired: number;
  };
}
