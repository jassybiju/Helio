import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class DoctorDashboardController {
    _getDoctorDashboard;
    constructor(_getDoctorDashboard) {
        this._getDoctorDashboard = _getDoctorDashboard;
    }
    getDashboard = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { period } = req.query;
            const response = await this._getDoctorDashboard.execute(doctorId, period);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "DOCTOR DASHBOARD FETCH SUCCESFULLY"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=dashboard.controller.js.map