import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILabReportRepository } from "@application/ports/repositories/ILabReportRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IRemoveLabReportUseCase } from "@application/ports/use-cases/doctor/consultation/IRemoveLabReportUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class DoctorRemoveLabReportUseCase implements IRemoveLabReportUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _labRepo: ILabReportRepository
  ) {}
  async execute(
    doctorId: string,
    appointmentId: string,
    labId: string
  ): Promise<void> {
    this._logger.info("remove doctor Lab report request  attempt", {
      doctorId,
      appointmentId,
      labId,
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

    const lab = await this._labRepo.findById(labId);
    if (!lab) {
      throw new NotFoundError("Lab Report Not Found");
    }

    if (lab.appointmentId !== appointment.id) {
      throw new ForbiddenError("Lab report can't access");
    }

    await this._labRepo.delete(lab.id);
  }
}
