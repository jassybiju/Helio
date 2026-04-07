import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type {
  GetDoctorUseCaseResult,
  IGetDoctorUseCase,
} from "@application/ports/use-cases/admin/doctor/IGetDoctorUseCase.ts";
import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GetDoctorUseCase implements IGetDoctorUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}

  async execute(doctorId: string): Promise<GetDoctorUseCaseResult> {
    this._logger.info("Get doctor attempt by admin", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor Not found", HTTPStatus.NOT_FOUND);
    }

    const documentUrl = doctor.documentKey
      ? this._fileUpload.getFileUrl(doctor.documentKey)
      : null;

    const verificationHistory = doctor.verificationHistory.map((his) => ({
      status: his.status,
      reason: his.reason,
      documentUrl: his.documentKey
        ? this._fileUpload.getFileUrl(his.documentKey)
        : null,
      actedAt: his.actedAt.toISOString(),
    }));

    return { doctor, documentUrl, verificationHistory };
  }
}
