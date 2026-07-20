import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorViewAppointmentUseCase } from "@application/ports/use-cases/doctor/appointment/IDoctorViewAppointmentUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import type { IDoctorViewAppointmentDTO } from "./IDoctorViewAppointmentDTO.ts";
import { DoctorViewAppointmentMapper } from "./DoctorViewAppointmentMapper.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";

export class DoctorViewAppointmentUseCase implements IDoctorViewAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _consultationRepo: IConsultationRepository
  ) {}
  async execute(
    doctorId: string,
    appointmentId: string
  ): Promise<IDoctorViewAppointmentDTO> {
    this._logger.info("Doctor View Appointment Repo ", {
      doctorId,
      appointmentId,
    });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
    }

    if (appointment.doctorId !== doctor.id) {
      throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
    }

    const patient = await this._patientRepo.findById(appointment.patientId);

    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }
    const consultation = await this._consultationRepo.findByAppointmentId(
      appointment.id
    );

    return DoctorViewAppointmentMapper.toDto(
      appointment,
      patient,
      consultation
    );
  }
}
