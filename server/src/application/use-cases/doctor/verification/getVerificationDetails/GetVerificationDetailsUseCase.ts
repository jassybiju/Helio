import type { IGetVerificationDetailsResponseDTO } from "@application/use-cases/doctor/verification/getVerificationDetails/IGetVerificationDetailsDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetVerificationDetailsUseCase } from "@application/ports/use-cases/doctor/verification/IGetVerificationDetailsUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GetVerificationDetailsUseCase implements IGetVerificationDetailsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(userId: string): Promise<IGetVerificationDetailsResponseDTO> {
    this._logger.info("Get Doctor Verification Details Attempt", { userId });

    const doctor = await this._doctorRepo.findById(userId);
    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    let document_url: string = doctor.documentKey
      ? this._fileUpload.getFileUrl(doctor.documentKey, true)
      : "";

    return {
      verification_status: doctor.verificationStatus,
      document_url: document_url,
      rejection_reason: doctor.rejectionReason ?? "",
      verification_history: doctor.verificationHistory.map((doc) => ({
        verification_status: doc.status,
        rejection_reason: doc.reason ?? "",
        actedAt: doc.actedAt.toLocaleString(),
        document_url: doc.documentKey
          ? this._fileUpload.getFileUrl(doc.documentKey, true)
          : "",
      })),
      userId: doctor.id,
    };
  }
}
