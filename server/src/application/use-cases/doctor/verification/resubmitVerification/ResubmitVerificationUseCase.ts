import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IResubmitVerificationUseCase } from "#application/ports/use-cases/doctor/verification/IResubmitVerificationUseCase.js";
import { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import { Doctor } from "#domain/entities/Doctor.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class ResubmitVerificationUseCase implements IResubmitVerificationUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    doctorId: string,
    input: {
      document: { buffer: Buffer; mimetype: string; originalname: string };
      additionalInfo: string;
    }
  ): Promise<void> {
    const { additionalInfo, document } = input;
    this._logger.info("Resubmit Verification Attempt", {
      doctorId,
      additionalInfo,
    });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const documentKey = await this._fileUpload.upload(document, true);

    if (
      Doctor.isValidTransistion(
        doctor.verificationStatus,
        DOCTOR_VERIFICATION_STATUS.PENDING
      )
    ) {
      doctor.resubmit(documentKey, additionalInfo);
    }

    await this._doctorRepo.update(doctor);
  }
}
