import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IAddLabReportUseCase.js";
import { LabReport } from "#domain/entities/LabReport.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class DoctorAddLabReportUseCase implements IAddLabReportUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _labRepo: ILabReportRepository,
    private readonly _idGenerator: IIDGenerator
  ) {}
  async execute(
    doctorId: string,
    appointmentId: string,
    input: { testName: string; instructions: string }
  ): Promise<void> {
    this._logger.info("doctor Lab report request  attempt", {
      doctorId,
      appointmentId,
      input,
    });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
    }

    if (appointment.doctorId !== doctorId) {
      throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
    }
    const consultation = await this._consultationRepo.findByAppointmentId(
      appointment.id
    );
    if (!consultation) {
      throw new NotFoundError(MESSAGE.CONSULTATION_NOT_FOUND);
    }

    const labId = this._idGenerator.generate(process.env.LAB_PREFIX ?? "LAB");
    const labReport = LabReport.create({
      id: labId,
      consultationId: consultation.id,
      doctorId: doctor.id,
      appointmentId: appointment.id,
      testName: input.testName,
      instructions: input.instructions,
      patientId: consultation.patientId,
    });

    await this._labRepo.create(labReport);
  }
}
