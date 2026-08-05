import type { DoctorAppointmentListItem, FindAppointmentsFilter, IAppointmentDashboardStatistics, IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import { Appointment } from "#domain/entities/Appointment.js";
import { BaseRepository } from "./BaseRepository.js";
import { type AppointmentRaw } from "../model/AppointmentModel.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { ClientSession } from "mongoose";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
export declare class AppointmentRepository extends BaseRepository<Appointment, AppointmentRaw> implements IAppointmentRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): IAppointmentRepository;
    countCompletedAppointments(patientId: string, doctorId: string): Promise<number>;
    findExistingPatientAppointment(patientId: string, doctorId: string, startTime: Date): Promise<Appointment | null>;
    getDoctorBookingTrend(doctorId: string, period: BOOKING_PERIOD): Promise<{
        label: string;
        count: number;
    }[]>;
    countOccupiedSlots(doctorId: string, startTime: Date, type: CONSULTATION_TYPE): Promise<number>;
    create(appointment: Appointment): Promise<void>;
    update(appointment: Appointment): Promise<void>;
    findActiveInRange(doctorId: string, _start: Date, _end: Date): Promise<Appointment[]>;
    findById(id: string): Promise<Appointment | null>;
    expirePendingAppointments(): Promise<void>;
    findManyWithFilters(filters: FindAppointmentsFilter): Promise<{
        appointments: {
            appointment: Appointment;
            patientName: string;
            doctorName: string;
        }[];
        totalCount: number;
    }>;
    findOngoingAppointmentByDoctor(doctorId: string): Promise<Appointment | null>;
    findNextQueueAppointment(doctorId: string, date: Date): Promise<Appointment[]>;
    countAllAppointmentbyDoctorId(doctorId: string): Promise<number>;
    findDoctorAppointmentForRange(doctorId: string, startTime: Date, endTime: Date): Promise<Appointment[]>;
    findActiveQueueByDoctorAndTime(doctorId: string, startTime: Date): Promise<Appointment[]>;
    findAllWithFilters(filters: FindAppointmentsFilter): Promise<DoctorAppointmentListItem[]>;
    private buildAppointmentPipeline;
    countAppointmentWithPatientAndDoctor(patientId: string, doctorId: string): Promise<number>;
    getDashboardStatistics(period: BOOKING_PERIOD): Promise<IAppointmentDashboardStatistics>;
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
}
//# sourceMappingURL=AppointmentRepository.d.ts.map