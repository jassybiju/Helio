import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class PatientDashboardController {
    _getDashboard;
    constructor(_getDashboard) {
        this._getDashboard = _getDashboard;
    }
    getDashboard = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            if (!patientId) {
                throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
            }
            const response = await this._getDashboard.execute(patientId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Patient Dashboard Got Successfully"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=dashboard.controller.js.map