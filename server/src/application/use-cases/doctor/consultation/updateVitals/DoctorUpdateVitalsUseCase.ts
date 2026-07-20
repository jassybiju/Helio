import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUpdateVitalsConsultationUseCase } from "@application/ports/use-cases/doctor/consultation/IUpdateVitalsConsultationUseCase.ts";
import { Vital } from "@domain/value-objects/Vitals.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class DoctorUpdateVitalsUseCase implements IUpdateVitalsConsultationUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    doctorId: string,
    appointmentId: string,
    data: {
      bloodPressure: string | null;
      oxygenLevel: number | null;
      heartRate: number | null;
      temperature: number | null;
      weight: number | null;
      height: number | null;
    }
  ): Promise<void> {
    this._logger.info("Doctor Update vitals attempt", {
      doctorId,
      appointmentId,
      data,
    });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }
    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
    }
    const consultation = await this._consultationRepo.findByAppointmentId(
      appointment.id
    );
    if (!consultation) {
      throw new NotFoundError(MESSAGE.CONSULTATION_NOT_FOUND);
    }

    if (consultation.doctorId !== doctor.id) {
      throw new ForbiddenError(MESSAGE.CONSULTATION_NOT_ACCESS);
    }

    consultation.ensureActive();

    const vital = new Vital(
      data.bloodPressure,
      data.oxygenLevel,
      data.heartRate,
      data.temperature,
      data.weight,
      data.height
    );

    consultation.addVitals(vital);

    await this._consultationRepo.update(consultation);
  }
}
