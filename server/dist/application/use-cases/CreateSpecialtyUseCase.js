import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class CreateSpecialtyUseCase {
    _specialtyRepo;
    _idGenerator;
    _logger;
    constructor(_specialtyRepo, _idGenerator, _logger) {
        this._specialtyRepo = _specialtyRepo;
        this._idGenerator = _idGenerator;
        this._logger = _logger;
    }
    async execute(input) {
        this._logger.info("Create Specialty Attempt", input);
        // normalize name (important)
        const name = input.name.trim();
        if (!name) {
            throw new AppError("Specialty name is required", HTTPStatus.BAD_REQUEST);
        }
        // (optional but recommended) check duplicate
        const id = this._idGenerator.generate("SPEC_");
        await this._specialtyRepo.create({
            _id: id,
            name,
            description: input.description ?? null,
        });
        return { id };
    }
}
//# sourceMappingURL=CreateSpecialtyUseCase.js.map