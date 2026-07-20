import type {
  IDoctorFilters,
  IDoctorRepository,
} from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetAllDoctorsUseCase } from "@application/ports/use-cases/admin/doctor/IGetAllDoctorsUseCase.ts";
import type {
  IGetAllDoctorsRequestDTO,
  IGetAllDoctorsResponseDTO,
} from "./IGetAllDoctorsDTO.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import { GetAllDoctorMapper } from "./GetAllDoctorMapper.ts";

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
      doctors: GetAllDoctorMapper.toDto(doctors, this._fileUpload.getFileUrl),
      totalCount,
      page,
      limit,
    };
  }
}
