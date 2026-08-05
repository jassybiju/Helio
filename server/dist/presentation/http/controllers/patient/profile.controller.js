import { patientCompleteProfileSchema, updatePatientSchema, } from "../../schemas/patient/profile.schema.js";
import {} from "express";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { ValidationError } from "#shared/errors/ValidationError.js";
export class PatientProfileController {
    _completeProfile;
    _getPatientProfile;
    _addPatientAllergen;
    _removePatientAllergen;
    _addPatientCondition;
    _removePatientCondition;
    _changePassword;
    _updatePatientProfile;
    _updatePatientProfilePic;
    constructor(_completeProfile, _getPatientProfile, _addPatientAllergen, _removePatientAllergen, _addPatientCondition, _removePatientCondition, _changePassword, _updatePatientProfile, _updatePatientProfilePic) {
        this._completeProfile = _completeProfile;
        this._getPatientProfile = _getPatientProfile;
        this._addPatientAllergen = _addPatientAllergen;
        this._removePatientAllergen = _removePatientAllergen;
        this._addPatientCondition = _addPatientCondition;
        this._removePatientCondition = _removePatientCondition;
        this._changePassword = _changePassword;
        this._updatePatientProfile = _updatePatientProfile;
        this._updatePatientProfilePic = _updatePatientProfilePic;
    }
    updateProfilePic = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
            }
            if (!req.file) {
                throw new ValidationError("FILE is required");
            }
            await this._updatePatientProfilePic.execute(userId, req.file);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, "PROFILE PIC UPDATED"));
        }
        catch (error) {
            next(error);
        }
    };
    completeProfile = async (req, res, next) => {
        try {
            const parsed = patientCompleteProfileSchema.safeParse(req.body);
            const userId = req.user.id;
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._completeProfile.execute(userId, {
                ...parsed.data,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Patient Profile Completed"));
        }
        catch (error) {
            next(error);
        }
    };
    getPatient = async (req, res, next) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const response = await this._getPatientProfile.execute(userId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.PATIENT_PROFILE_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    addAllergen = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { allergen, severity } = req.body;
            if (!userId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            await this._addPatientAllergen.execute(userId, allergen, severity);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.PATIENT_ADD_ALLERGEN_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    removeAllergen = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const allergenId = req.params.allergenId;
            if (!userId || !allergenId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            await this._removePatientAllergen.execute(userId, allergenId);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.PATIENT_REMOVE_ALLERGEN_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    addCondition = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { condition } = req.body;
            if (!userId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            await this._addPatientCondition.execute(userId, condition);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.PATIENT_ADD_CONDITION_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    removeCondition = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const conditionId = req.params.conditionId;
            if (!userId || !conditionId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            await this._removePatientCondition.execute(userId, conditionId);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.PATIENT_REMOVE_CONDITION_SUCCESS));
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
    updateProfile = async (req, res, next) => {
        try {
            const parsed = updatePatientSchema.safeParse(req.body);
            const userId = req.user.id;
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._updatePatientProfile.execute({
                patientId: userId,
                ...parsed.data,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Patient Profile Updated Succesfully"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=profile.controller.js.map