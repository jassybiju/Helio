import type { IGetAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/IGetAppointmentUseCase.ts";
import type { IGetAppointmentDTO } from "./IGetAppointmentDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";

export class GetAppointmentUseCase implements IGetAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(
    patientId: string,
    appointmentId: string
  ): Promise<IGetAppointmentDTO> {
    this._logger.info("Get Appotinemnt Attempt", { appointmentId, patientId });

    const patient = await this._patientRepo.findById(patientId);
    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);

    if (!appointment) {
      throw new AppError("Appointment Not Found", HTTPStatus.NOT_FOUND);
    }

    if (appointment.patientId !== patient.id) {
      throw new AppError(
        "Appointment Not of this user",
        HTTPStatus.BAD_REQUEST
      );
    }

    const doctor = await this._doctorRepo.findById(appointment.doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    return {
      appointmentId: appointment.id,
      doctorId: appointment.doctorId,
      doctorName: doctor.fullName,
      consultationFee: appointment.consultationFee,
      start_time: appointment.startTime,
      end_time: appointment.endTime,
      consultationType: appointment.consultationType,
      platformFee: appointment.platformFee,
      status: appointment.status,
      totalFee: appointment.totalAmount,
    };
  }
}
