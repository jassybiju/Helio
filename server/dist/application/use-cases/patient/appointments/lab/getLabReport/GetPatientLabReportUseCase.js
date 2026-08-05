import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export class GetPatientLabReportUseCase {
    _logger;
    _patientRepo;
    _labRepo;
    _fileUpload;
    constructor(_logger, _patientRepo, _labRepo, _fileUpload) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._labRepo = _labRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(patientId, data) {
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        const requestedReports = await this._labRepo.findRequestedByPatient(patient.id);
        const { reports: uploadedReports, totalCount } = await this._labRepo.findByPatient(patient.id, data.page, data.limit, [
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
                reports: uploadedReports.map((report) => ({
                    id: report.id,
                    testName: report.testName,
                    documentKey: this._fileUpload.getFileUrl(report.documentKey ?? "", true),
                    remarks: report.remarks,
                    instructions: report.instructions,
                    requestedAt: report.requestedAt,
                    uploadedAt: report.uploadedAt,
                    status: report.status,
                    appointmentId: report.appointmentId,
                })),
                totalCount,
                page: data.page,
                limit: data.limit,
            },
        };
    }
}
//# sourceMappingURL=GetPatientLabReportUseCase.js.map