import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IRemovePrescriptionUseCase } from "@application/ports/use-cases/doctor/consultation/IRemovePrescriptionUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class DoctorRemovePrescriptionUseCase implements IRemovePrescriptionUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    doctorId: string,
    appointmentId: string,
    prescriptionName: string
  ): Promise<void> {
    this._logger.info("Doctor remove prescription attempt", {
      doctorId,
      appointmentId,
      prescriptionName,
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

    consultation.removePrescription(prescriptionName);

    await this._consultationRepo.update(consultation);
  }
}
