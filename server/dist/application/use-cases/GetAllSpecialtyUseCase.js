export class GetAllSpecialtyUseCase {
    _logger;
    _specialtyRepo;
    constructor(_logger, _specialtyRepo) {
        this._logger = _logger;
        this._specialtyRepo = _specialtyRepo;
    }
    async execute() {
        this._logger.info("Get All Specialty Attempt");
        const specialties = await this._specialtyRepo.findAllActive();
        return specialties.map((spec) => ({
            _id: spec.id,
            label: spec.name,
            value: spec.name,
        }));
    }
}
//# sourceMappingURL=GetAllSpecialtyUseCase.js.map