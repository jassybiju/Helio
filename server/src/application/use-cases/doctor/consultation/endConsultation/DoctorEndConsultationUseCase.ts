import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import type { IDoctorEndConsultationUseCase } from "@application/ports/use-cases/doctor/consultation/IDoctorEndConsultationUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class DoctorEndConsultationUseCase implements IDoctorEndConsultationUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _uow: IUnitOfWork
  ) {}
  async execute(doctorId: string, appointmentId: string): Promise<void> {
    this._logger.info("Doctor End Consultation Attempt", {
      doctorId,
      appointmentId,
    });

    return await this._uow.execute(async (session) => {
      const doctorRepo = this._doctorRepo.withSession(session);
      const appointmentRepo = this._appointmentRepo.withSession(session);
      const consultationRepo = this._consultationRepo.withSession(session);

      const doctor = await doctorRepo.findById(doctorId);
      if (!doctor) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const appointment = await appointmentRepo.findById(appointmentId);
      if (!appointment) {
        throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
      }
      const consultation = await this._consultationRepo.findByAppointmentId(
        appointment.id
      );
      if (!consultation) {
        throw new NotFoundError("Consultation not found");
      }

      if (consultation.doctorId !== doctor.id) {
        throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
      }

      consultation.end();
      appointment.endConsultation();

      await Promise.all([
        consultationRepo.update(consultation),
        appointmentRepo.update(appointment),
      ]);
    });
  }
}
