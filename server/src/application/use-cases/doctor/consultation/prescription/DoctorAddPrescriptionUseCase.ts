import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddPrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IAddPrescriptionUseCase.js";
import type { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
import { Prescription } from "#domain/value-objects/Prescription.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class DoctorAddPrescriptionUseCase implements IAddPrescriptionUseCase {
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
      name: string;
      foodTiming: FOOD_TIMING;
      timings: { morning: boolean; afternoon: boolean; night: boolean };
      durationInDays: number;
      instruction: string;
    }
  ): Promise<void> {
    this._logger.info("Doctor add prescription attempt", {
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

    const prescription = new Prescription(
      data.name,
      data.foodTiming,
      data.timings,
      data.durationInDays,
      data.instruction
    );

    consultation.addPrescription(prescription);
    await this._consultationRepo.update(consultation);
  }
}
