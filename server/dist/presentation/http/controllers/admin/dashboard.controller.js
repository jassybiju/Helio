import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class AdminDashboardController {
    _dashboardUseCase;
    constructor(_dashboardUseCase) {
        this._dashboardUseCase = _dashboardUseCase;
    }
    get = async (req, res, next) => {
        try {
            const { period } = req.query;
            const response = await this._dashboardUseCase.execute(period);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "ADMIN DASHBOARD FETCH SUCCESFFULLLY "));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=dashboard.controller.js.map