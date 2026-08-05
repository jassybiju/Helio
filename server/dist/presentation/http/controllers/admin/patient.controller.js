import { getAllPatientsSchema } from "../../schemas/admin/patient.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { GetPatientMapper } from "#application/use-cases/admin/patient/getPatient/GetPatientMapper.js";
export class AdminPatientController {
    _getAllPatientUsecase;
    _getPatientUseCase;
    _toggleBlockPatientUseCase;
    constructor(_getAllPatientUsecase, _getPatientUseCase, _toggleBlockPatientUseCase) {
        this._getAllPatientUsecase = _getAllPatientUsecase;
        this._getPatientUseCase = _getPatientUseCase;
        this._toggleBlockPatientUseCase = _toggleBlockPatientUseCase;
    }
    getAllPatients = async (req, res, next) => {
        try {
            const parsed = getAllPatientsSchema.safeParse(req.query);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._getAllPatientUsecase.execute(parsed.data);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.PATIENT_FETCH_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    getPatient = async (req, res, next) => {
        try {
            const id = req.params.patientId;
            if (!id) {
                throw new AppError("Doctor Id Required", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._getPatientUseCase.execute(id);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.PATIENT_FETCH_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    toggleBlock = async (req, res, next) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                throw new AppError("Invalid UserId", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._toggleBlockPatientUseCase.execute(userId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.PATIENT_FETCH_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=patient.controller.js.map