import type { IGetPatientLabReportUseCase } from "@application/ports/use-cases/patient/appointments/IGetPatientLabReportUseCase.ts";
import type { IGetPatientLabReportsDTO } from "./IGetPatientLabReportDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILabReportRepository } from "@application/ports/repositories/ILabReportRepository.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

export class GetPatientLabReportUseCase implements IGetPatientLabReportUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _labRepo: ILabReportRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    patientId: string,
    data: { page: number; limit: number }
  ): Promise<IGetPatientLabReportsDTO> {
    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    const requestedReports = await this._labRepo.findRequestedByPatient(
      patient.id
    );

    const { reports: uploadedReports, totalCount } =
      await this._labRepo.findByPatient(patient.id, data.page, data.limit);

    return {
      requested: requestedReports.map((report) => ({
        id: report.id,
        testName: report.testName,
        instructions: report.instructions,
        requestedAt: report.requestedAt,
        status: report.status,
      })),

      uploaded: {
        reports: uploadedReports
          .filter((r) => r.status === LAB_REPORT_STATUS.UPLOADED)
          .map((report) => ({
            id: report.id,
            testName: report.testName,
            documentKey: this._fileUpload.getFileUrl(
              report.documentKey ?? "",
              true
            ),
            remarks: report.remarks,
            requestedAt: report.requestedAt,
            uploadedAt: report.uploadedAt,
            status: report.status,
          })),

        totalCount,
        page: data.page,
        limit: data.limit,
      },
    };
  }
}
