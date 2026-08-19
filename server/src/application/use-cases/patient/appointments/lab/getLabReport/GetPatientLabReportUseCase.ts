import type { IGetPatientLabReportUseCase } from "#application/ports/use-cases/patient/appointments/IGetPatientLabReportUseCase.js";
import type { IGetPatientLabReportsDTO } from "./IGetPatientLabReportDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

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
      await this._labRepo.findByPatient(patient.id, data.page, data.limit, [
        LAB_REPORT_STATUS.UPLOADED,
      ]);

    return {
      requested: requestedReports.map((report) => ({
        id: report.id,
        testName: report.testName,
        instructions: report.instructions,
        requestedAt: report.requestedAt,
        status: report.status,
        appointmentId: report.appointmentId,
      })),

      uploaded: {
        reports: await Promise.all(
          uploadedReports.map(async (report) => ({
            id: report.id,
            testName: report.testName,
            documentKey: await this._fileUpload.getFileUrl(
              report.documentKey ?? "",
              true
            ),
            remarks: report.remarks,
            instructions: report.instructions,
            requestedAt: report.requestedAt,
            uploadedAt: report.uploadedAt,
            status: report.status,
            appointmentId: report.appointmentId,
          }))
        ),

        totalCount,
        page: data.page,
        limit: data.limit,
      },
    };
  }
}
