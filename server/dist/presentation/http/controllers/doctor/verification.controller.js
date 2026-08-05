import { AppError } from "#shared/errors/AppError.js";
import { ValidationError } from "#shared/errors/ValidationError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class DoctorVerificationController {
    _getVerificationDetailsUseCase;
    _resubmitVerificationUseCase;
    constructor(_getVerificationDetailsUseCase, _resubmitVerificationUseCase) {
        this._getVerificationDetailsUseCase = _getVerificationDetailsUseCase;
        this._resubmitVerificationUseCase = _resubmitVerificationUseCase;
    }
    getVerificationDetails = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const response = await this._getVerificationDetailsUseCase.execute(userId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Doctor Verification Response Got Successfulyy"));
        }
        catch (error) {
            next(error);
        }
    };
    resubmitVerification = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { additionalInfo } = req.body;
            if (!req.file) {
                throw new ValidationError("FILE is required");
            }
            if (!additionalInfo) {
                throw new AppError("Additional Info is required", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            await this._resubmitVerificationUseCase.execute(userId, {
                document: req.file,
                additionalInfo,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse({}, "Doctor Resubmitted Successfully"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=verification.controller.js.map