import type { IGetPatientDashboardUseCase } from "#application/ports/use-cases/patient/dashboard/IGetPatientDashboardUseCase.js";
import type { IGetPatientDashboardDTO } from "./IGetPatientDashboardDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type {
  IAppointmentRepository,
  FindAppointmentsFilter,
  PatientLatestVitals,
  IActiveMedication,
} from "#application/ports/repositories/IAppointmentRepository.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";

export class GetPatientDashboardUseCase implements IGetPatientDashboardUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}

  async execute(patientId: string): Promise<IGetPatientDashboardDTO> {
    this._logger.info("Get Patient Dashboard Attempt", {
      patientId,
    });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    const filter: FindAppointmentsFilter = {
      patientId,
    };

    const { appointments } =
      await this._appointmentRepo.findManyWithFilters(filter);

    const now = new Date();

    const totalAppointments = appointments.length;

    const completedAppointments = appointments.filter(
      ({ appointment }) => appointment.status === APPOINTMENT_STATUS.COMPLETED
    ).length;

    const cancelledAppointments = appointments.filter(
      ({ appointment }) =>
        appointment.status === APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR ||
        appointment.status === APPOINTMENT_STATUS.CANCELLED_BY_PATIENT
    ).length;

    const upcomingAppointments = appointments.filter(
      ({ appointment }) =>
        appointment.startTime > now &&
        appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
        appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT &&
        appointment.status !== APPOINTMENT_STATUS.EXPIRED
    ).length;

    const nextAppointment = appointments
      .filter(
        ({ appointment }) =>
          appointment.startTime > now &&
          appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
          appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT &&
          appointment.status !== APPOINTMENT_STATUS.EXPIRED
      )
      .sort(
        (a, b) =>
          a.appointment.startTime.getTime() - b.appointment.startTime.getTime()
      )[0];

    const latestCompletedAppointment =
      await this._appointmentRepo.getLatestCompletedAppointmentWithVitals(
        patient.id
      );
    const activeMedicationAppointments =
      await this._appointmentRepo.getActiveMedications(patient.id);
    return {
      stats: {
        totalAppointments,
        completedAppointments,
        upcomingAppointments,
        cancelledAppointments,
      },

      vitals: this.getVitals(latestCompletedAppointment),

      medications: this.getMedications(activeMedicationAppointments),

      nextAppointment: nextAppointment
        ? {
            doctorName: nextAppointment.doctorName,
            specialty: nextAppointment.doctorName ?? "",
            date: nextAppointment.appointment.startTime,
            appointmentId: nextAppointment.appointment.id,
          }
        : {
            doctorName: "",
            specialty: "",
            date: new Date(),
            appointmentId: "",
          },
    };
  }

  private getVitals(
    latestCompletedAppointment: PatientLatestVitals | null
  ): IGetPatientDashboardDTO["vitals"] {
    if (!latestCompletedAppointment) {
      return {
        heartRate: "",
        bloodPressure: "",
        oxygenLevel: "",
        temperature: "",
        weight: "",
        height: "",
        fromAppointmentId: "",
        date: new Date(),
      };
    }
    const vitals = latestCompletedAppointment.vitals;
    const appointment = latestCompletedAppointment.appointment;

    return {
      heartRate: String(vitals.heartRate) ?? "",
      bloodPressure: vitals.bloodPressure ?? "",
      oxygenLevel: String(vitals.oxygenLevel) ?? "",
      temperature: String(vitals.temperature) ?? "",
      weight: String(vitals.weight) ?? "",
      height: String(vitals.height) ?? "",
      fromAppointmentId: appointment.id,
      date: appointment.startTime,
    };
  }

  private getMedications(
    latestCompletedAppointment: IActiveMedication[]
  ): IGetPatientDashboardDTO["medications"] {
    const appointment = latestCompletedAppointment;

    if (appointment.length == 0) {
      return [];
    }

    return latestCompletedAppointment.map((app) => ({
      doctorName: app.doctorId,
      prescription: app.prescriptions.map((pres) => ({
        name: pres.name,
        foodTiming: pres.foodTiming,
        timing: pres.timings,
        durationInDays: pres.durationInDays,
        validTill: new Date(
          new Date(app.endedAt!).getTime() +
            app.medicationPeriod! * 24 * 60 * 60 * 1000
        ),
        instructions: pres.instructions,
      })),
      fromAppointemnts: app.appointmentId,
    }));
  }
}
