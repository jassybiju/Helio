import type { IGetAllPatientsUseCase } from "#application/ports/use-cases/admin/patient/IGetAllPatientsUseCase.js";
import type {
  IGetAllPatientsRequestDTO,
  IGetAllPatientsResponseDTO,
} from "./IGetAllPatientsDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type {
  IPatientFilters,
  IPatientRepository,
} from "#application/ports/repositories/IPatientRepository.js";
import { GetAllPatientsMapper } from "./GetAllPatientMapper.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

export class GetAllPatientsUseCase implements IGetAllPatientsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    input: IGetAllPatientsRequestDTO
  ): Promise<IGetAllPatientsResponseDTO> {
    this._logger.info("Get All Patients attempt", input);

    const {
      search,
      createdFrom,
      createdTo,
      isBlocked,
      isVerified,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = input;
    // creating filter obj
    const filter: IPatientFilters = {
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

    const { patients, totalCount } =
      await this._patientRepo.findAllWithFilters(filter);

    return GetAllPatientsMapper.toDto(
      patients,
      page,
      limit,
      totalCount,
      this._fileUpload.getFileUrl
    );
  }
}
