import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class RemoveSpecialtyUseCase {
    _specialtyRepo;
    _logger;
    constructor(_specialtyRepo, _logger) {
        this._specialtyRepo = _specialtyRepo;
        this._logger = _logger;
    }
    async execute(id) {
        this._logger.info("Remove Specialty Attempt", { id });
        if (!id) {
            throw new AppError("Specialty ID is required", HTTPStatus.BAD_REQUEST);
        }
        const existing = await this._specialtyRepo.findById(id);
        if (!existing) {
            throw new AppError("Specialty not found", HTTPStatus.NOT_FOUND);
        }
        if (!existing.isActive) {
            throw new AppError("Specialty already inactive", HTTPStatus.BAD_REQUEST);
        }
        await this._specialtyRepo.delete(id);
    }
}
//# sourceMappingURL=RemoveSpecialtyUseCase.js.map