import type { ILabReportRepository } from "@application/ports/repositories/ILabReportRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUploadPatientLabReportUseCase } from "@application/ports/use-cases/patient/appointments/IUploadPatientLabReportUseCase.ts";
import { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ConflictError } from "@shared/errors/ConflictError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class UploadPatientLabReportUseCase implements IUploadPatientLabReportUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _labRepo: ILabReportRepository,
    private readonly _fileUpload: IFileUpload
  ) {}

  async execute(
    patientId: string,
    reportId: string,
    document: { buffer: Buffer; mimetype: string; originalname: string }
  ): Promise<void> {
    this._logger.info("Upload Patient LabReport Attempt", {
      patientId,
      reportId,
    });

    const patient = await this._patientRepo.findById(patientId);
    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    const labReport = await this._labRepo.findById(reportId);

    if (!labReport) {
      throw new NotFoundError("Lab Report Not Found");
    }

    if (labReport.patientId !== patient.id) {
      throw new ConflictError("Cant Access labReport");
    }

    if (labReport.status !== LAB_REPORT_STATUS.REQUESTED) {
      throw new ConflictError("Already Uploaded");
    }

    const documentKey = await this._fileUpload.upload(document, true);

    labReport.uploadDocument(documentKey);

    await this._labRepo.update(labReport);
  }
}
