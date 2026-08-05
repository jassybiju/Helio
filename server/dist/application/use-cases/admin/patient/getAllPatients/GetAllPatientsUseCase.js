import { GetAllPatientsMapper } from "./GetAllPatientMapper.js";
export class GetAllPatientsUseCase {
    _logger;
    _patientRepo;
    _fileUpload;
    constructor(_logger, _patientRepo, _fileUpload) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(input) {
        this._logger.info("Get All Patients attempt", input);
        const { search, createdFrom, createdTo, isBlocked, isVerified, page = 1, limit = 10, sortBy = "createdAt", order = "desc", } = input;
        // creating filter obj
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
        const { patients, totalCount } = await this._patientRepo.findAllWithFilters(filter);
        return GetAllPatientsMapper.toDto(patients, page, limit, totalCount, this._fileUpload.getFileUrl);
    }
}
//# sourceMappingURL=GetAllPatientsUseCase.js.map