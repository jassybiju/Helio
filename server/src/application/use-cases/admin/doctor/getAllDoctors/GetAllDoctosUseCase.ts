import type {
  IDoctorFilters,
  IDoctorRepository,
} from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllDoctorsUseCase } from "#application/ports/use-cases/admin/doctor/IGetAllDoctorsUseCase.js";
import type {
  IGetAllDoctorsRequestDTO,
  IGetAllDoctorsResponseDTO,
} from "./IGetAllDoctorsDTO.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import { GetAllDoctorMapper } from "./GetAllDoctorMapper.js";

export class GetAllDoctorUseCase implements IGetAllDoctorsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}

  async execute(
    input: IGetAllDoctorsRequestDTO
  ): Promise<IGetAllDoctorsResponseDTO> {
    this._logger.info("Get All Doctor attempt", input);

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

    const filter: IDoctorFilters = {
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

    const { doctors, totalCount } =
      await this._doctorRepo.findAllWithFilters(filter);

    return {
      doctors: await GetAllDoctorMapper.toDto(
        doctors,
        this._fileUpload.getFileUrl
      ),
      totalCount,
      page,
      limit,
    };
  }
}
