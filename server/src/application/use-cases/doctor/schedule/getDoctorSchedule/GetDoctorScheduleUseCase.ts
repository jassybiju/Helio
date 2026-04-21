import type { IGetDoctorScheduleUseCase } from "@application/ports/use-cases/doctor/schedule/IGetDoctorScheduleUseCase.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { DoctorShift } from "@domain/entities/DoctorShift.ts";

export class GetDoctorScheduleUseCase implements IGetDoctorScheduleUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorShiftRepo: IDoctorShiftRepository
  ) {}
  async execute(doctorId: string): Promise<DoctorShift[]> {
    this._logger.info("Get Doctor Schedule Attempt", { doctorId });

    const shifts = this._doctorShiftRepo.findByDoctor(doctorId);

    return shifts;
  }
}
