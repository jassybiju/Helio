import { doctorCompleteProfileSchema, doctorUpdateFeeSchema, doctorUpdateProfileSchema, } from "../../schemas/doctor/profile.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { ValidationError } from "#shared/errors/ValidationError.js";
export class DoctorProfileController {
    _completeProfile;
    _getDoctorProfile;
    _updateDoctorFee;
    _updateDoctorProfile;
    _changePassword;
    _updateProfilePic;
    constructor(_completeProfile, _getDoctorProfile, _updateDoctorFee, _updateDoctorProfile, _changePassword, _updateProfilePic) {
        this._completeProfile = _completeProfile;
        this._getDoctorProfile = _getDoctorProfile;
        this._updateDoctorFee = _updateDoctorFee;
        this._updateDoctorProfile = _updateDoctorProfile;
        this._changePassword = _changePassword;
        this._updateProfilePic = _updateProfilePic;
    }
    updateProfilePic = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            if (!req.file) {
                throw new ValidationError("FILE is required");
            }
            await this._updateProfilePic.execute(userId, req.file);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, "PROFILE PIC UPDATED"));
        }
        catch (error) {
            next(error);
        }
    };
    completeProfile = async (req, res, next) => {
        try {
            const parsed = doctorCompleteProfileSchema.safeParse(req.body);
            const userId = req.user.id;
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._completeProfile.execute(userId, {
                ...parsed.data,
                document: req.file,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Doctor Profile Completed"));
        }
        catch (error) {
            next(error);
        }
    };
    getDoctor = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const response = await this._getDoctorProfile.execute(userId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.DOCTOR_PROFILE_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    updateDoctorFee = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = doctorUpdateFeeSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            await this._updateDoctorFee.execute(doctorId, parsed.data.onlineFee, parsed.data.clinicFee);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.DOCTOR_FEE_UPDATED));
        }
        catch (error) {
            next(error);
        }
    };
    updateDoctorProfile = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = doctorUpdateProfileSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            await this._updateDoctorProfile.execute({
                doctorId,
                ...parsed.data,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(null, "Doctor Profile Updated Successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    changePassword = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { newPassword, oldPassword } = req.body;
            if (!userId || !newPassword || !oldPassword || newPassword.length < 4) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            await this._changePassword.execute(userId, oldPassword, newPassword);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.PASSWORD_CHANGED_SUCCESFULY));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=profile.controller.js.map