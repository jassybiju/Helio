import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetPatientLiveQueueUseCase } from "@application/ports/use-cases/patient/appointments/IGetPatientLiveQueueUseCase.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GetPatientLiveQueueUseCase implements IGetPatientLiveQueueUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patienRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    appointmentId: string,
    patientId: string
  ): Promise<{
    queueNumber: number;
    queueNumberOfOngoingAppointment: number;
    timeLeftSeconds: string;
  }> {
    this._logger.info("Get Patietn Live Queue Attempt", {
      appointmentId,
      patientId,
    });

    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
    }

    const patient = await this._patienRepo.findById(patientId);
    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    if (appointment.patientId !== patient.id) {
      throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
    }

    // get all the appointment ahead of this appointment
    const queueAppointments =
      await this._appointmentRepo.findActiveQueueByDoctorAndTime(
        appointment.doctorId,
        new Date(appointment.startTime.getTime() + 60 * 1000)
      );

    const userIndex = queueAppointments.findIndex(
      (a) => a.id === appointment.id
    );
    const queueNumber = userIndex !== -1 ? userIndex : queueAppointments.length;

    // find which appointment is at the top
    const ongoingAppointment = queueAppointments.find(
      (a) => a.status === APPOINTMENT_STATUS.ONGOING
    );

    let referenceAppointment = ongoingAppointment;

    // if no ongoing appointment thatis doctor is not started consultation
    if (!referenceAppointment) {
      const completeAppointment = queueAppointments
        .filter((a) => a.status === APPOINTMENT_STATUS.COMPLETED)
        .sort((a, b) =>
          new Date(b.endTime).getTime() - new Date(a.endTime).getTime() === 0
            ? b.queueNumber - a.queueNumber
            : new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
        );

      referenceAppointment = completeAppointment[0];
      console.log(completeAppointment, referenceAppointment);
      if (!referenceAppointment) {
        throw new AppError(
          "Doctor Is Started Consultation",
          HTTPStatus.BAD_REQUEST
        );
      }
    }

    const queueNumberOfOngoingAppointment =
      queueAppointments.indexOf(referenceAppointment);

    // this._logger.debug("referenceAppoint", {
    //   queueAppointments,
    //   referenceAppointment,
    // });

    const slotDurationMs =
      appointment.endTime.getTime() - appointment.startTime.getTime();
    const slotDurationSeconds = slotDurationMs / 1000;

    const elapsedTime =
      Date.now() - new Date(appointment.consultationStartedAt!).getTime();

    const consultationStartedMs = new Date(
      new Date(referenceAppointment.consultationStartedAt!).getTime() -
        TWO_DAYS_MS
    ).getTime();
    const currentAppointmentEndTimeMs = new Date(
      new Date(appointment.endTime).getTime() - TWO_DAYS_MS
    ).getTime();
    const currentAppointmentStartTimeMs = new Date(
      new Date(appointment.startTime).getTime() - TWO_DAYS_MS
    ).getTime();

    const positionDifference = queueNumber - queueNumberOfOngoingAppointment;

    let timeLeftSeconds = 0;
    if (positionDifference > 0) {
      const nowMs = new Date().getTime();

      timeLeftSeconds = slotDurationSeconds * positionDifference;
      if (timeLeftSeconds < 0) timeLeftSeconds = 0;
      console.log(
        positionDifference,
        slotDurationSeconds,
        timeLeftSeconds,
        nowMs
      );
    }

    return {
      queueNumber,
      queueNumberOfOngoingAppointment,
      timeLeftSeconds: this._formatToHHMMSS(timeLeftSeconds),
    };
  }
  private _formatToHHMMSS(totalSeconds: number): string {
    this._logger.debug("", totalSeconds);
    const roundedSeconds = Math.max(0, Math.round(totalSeconds));

    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const seconds = roundedSeconds % 60;

    // Pads single digits with a leading zero (e.g., 4 -> "04")
    const pad = (num: number) => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}
