import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IExpiryAppointmentsUseCase } from "#application/ports/use-cases/patient/appointments/IExpiryAppointmentsUseCase.js";

export class ExpiryAppointmentsUseCase implements IExpiryAppointmentsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _appointementRepo: IAppointmentRepository
  ) {}
  async execute(): Promise<void> {
    this._logger.info("Expiry Appointemnt Handling");

    await this._appointementRepo.expirePendingAppointments();
    this._logger.info("Expiry Appointemnt Handled");
  }
}
