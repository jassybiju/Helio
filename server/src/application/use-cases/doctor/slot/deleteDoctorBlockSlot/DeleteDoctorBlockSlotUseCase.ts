import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDeleteDoctorBlockSlotUseCase } from "#application/ports/use-cases/doctor/slot/IDeleteDoctorBlockSlotUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class DeleteDoctorBlockSlotUseCase implements IDeleteDoctorBlockSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _blockSlotRepo: IDoctorBlockShiftRepository,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(doctorId: string, blockId: string): Promise<void> {
    this._logger.info("delete docto block slot attempt", { doctorId, blockId });

    const doctor = await this._doctorRepo.findById(doctorId);
    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const blockSlot = await this._blockSlotRepo.findById(blockId);
    if (!blockSlot) {
      throw new NotFoundError(MESSAGE.BLOCK_NOT_FOUND);
    }

    await this._blockSlotRepo.delete(blockSlot.id);
  }
}
