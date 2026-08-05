import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class NotificationController {
    _getAllNotifications;
    constructor(_getAllNotifications) {
        this._getAllNotifications = _getAllNotifications;
    }
    getAll = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const query = req.query;
            const response = await this._getAllNotifications.execute(userId, query.page, query.limit);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "GOT MESSAGE SUCCESFFuly"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=notification.controller.js.map