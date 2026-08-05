import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class UploadPatientLabReportUseCase {
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
    async execute(patientId, reportId, document) {
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
//# sourceMappingURL=UploadPatientLabReportUseCase.js.map