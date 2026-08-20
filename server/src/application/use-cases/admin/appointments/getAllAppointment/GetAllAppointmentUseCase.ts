import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllAppointmentUseCase } from "#application/ports/use-cases/admin/appointments/IGetAllAppointmentUseCase.js";
import type {
  IGetAllAppointmentInput,
  IGetAllAppointmentDTO,
} from "./IGetAllAppointmentDTO.js";

export class GetAllAppointmentUseCase implements IGetAllAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    input: IGetAllAppointmentInput
  ): Promise<IGetAllAppointmentDTO> {
    this._logger.info("Get All Appointment usecase", input);
    console.log(input);
    return await this._appointmentRepo.paginatedAppointmentDetailsForAdmin(
      input
    );
  }
}
