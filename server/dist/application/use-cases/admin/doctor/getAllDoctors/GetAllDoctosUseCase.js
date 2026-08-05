import { GetAllDoctorMapper } from "./GetAllDoctorMapper.js";
export class GetAllDoctorUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(input) {
        this._logger.info("Get All Doctor attempt", input);
        const { search, createdFrom, createdTo, isBlocked, isVerified, page = 1, limit = 10, sortBy = "createdAt", order = "desc", } = input;
        const filter = {
            search: search,
            createdFrom,
            createdTo,
            isBlocked,
            isVerified,
            page,
            limit,
            sort: sortBy == "firstName" ? "first_name" : "createdAt",
            order,
        };
        const { doctors, totalCount } = await this._doctorRepo.findAllWithFilters(filter);
        return {
            doctors: GetAllDoctorMapper.toDto(doctors, this._fileUpload.getFileUrl),
            totalCount,
            page,
            limit,
        };
    }
}
//# sourceMappingURL=GetAllDoctosUseCase.js.map