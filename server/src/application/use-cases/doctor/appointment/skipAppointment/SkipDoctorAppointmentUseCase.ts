import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ISkipDoctorAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/ISkipDoctorAppointmentUseCase.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class SkipDoctorAppointmentUseCase implements ISkipDoctorAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(doctorId: string, appointmentId: string): Promise<void> {
    this._logger.info("Skip doctor Appointment usecase", {
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
      throw new ConflictError(MESSAGE.APPOINTMENT_NOT_ACCESS);
    }

    const fakeDate = new Date();
    fakeDate.setDate(fakeDate.getDate() + 1);

    // if (fakeDate < appointment.startTime) {
    //   throw new ConflictError("Appointment can't skipped begore start tiem");
    // }

    if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) {
      throw new ConflictError("Appointment can't skipped");
    }

    appointment.skip();

    await this._appointmentRepo.update(appointment);
  }
}
