import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class PatientReviewController {
    _addReview;
    constructor(_addReview) {
        this._addReview = _addReview;
    }
    addReview = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            if (!patientId) {
                throw new AppError("Patient Id Requried", HTTPStatus.INTERNAL_ERROR);
            }
            const doctorId = req.params.doctorId;
            const body = req.body;
            const response = await this._addReview.execute(patientId, doctorId, body);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Review Added"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=review.controller.js.map