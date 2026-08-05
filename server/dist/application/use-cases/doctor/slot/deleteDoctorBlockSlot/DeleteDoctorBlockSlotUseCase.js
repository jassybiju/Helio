import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DeleteDoctorBlockSlotUseCase {
    _logger;
    _blockSlotRepo;
    _doctorRepo;
    constructor(_logger, _blockSlotRepo, _doctorRepo) {
        this._logger = _logger;
        this._blockSlotRepo = _blockSlotRepo;
        this._doctorRepo = _doctorRepo;
    }
    async execute(doctorId, blockId) {
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
//# sourceMappingURL=DeleteDoctorBlockSlotUseCase.js.map