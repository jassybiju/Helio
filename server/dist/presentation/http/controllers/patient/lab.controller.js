import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class PatientLabReportController {
    _getLabReport;
    _uploadLabReport;
    constructor(_getLabReport, _uploadLabReport) {
        this._getLabReport = _getLabReport;
        this._uploadLabReport = _uploadLabReport;
    }
    getLabReport = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            const query = req.query;
            const response = await this._getLabReport.execute(patientId, query);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Lab report got succesfully"));
        }
        catch (error) {
            next(error);
        }
    };
    uploadReport = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            const { reportId } = req.params;
            const response = await this._uploadLabReport.execute(patientId, reportId, req.file);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Lab report Uploaded succesfully"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=lab.controller.js.map