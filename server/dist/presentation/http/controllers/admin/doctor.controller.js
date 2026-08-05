import { changeDoctorApprovalStatusSchema, getAllDoctorSchema, } from "../../schemas/admin/doctor.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { GetDoctorMapper } from "#application/use-cases/admin/doctor/getDoctor/GetDoctorMapper.js";
export class AdminDoctorController {
    _getAllDoctorUseCase;
    _getDoctorUseCase;
    _changeDoctorApprovalStatusUseCase;
    _toggleBlockDoctorUseCase;
    constructor(_getAllDoctorUseCase, _getDoctorUseCase, _changeDoctorApprovalStatusUseCase, _toggleBlockDoctorUseCase) {
        this._getAllDoctorUseCase = _getAllDoctorUseCase;
        this._getDoctorUseCase = _getDoctorUseCase;
        this._changeDoctorApprovalStatusUseCase = _changeDoctorApprovalStatusUseCase;
        this._toggleBlockDoctorUseCase = _toggleBlockDoctorUseCase;
    }
    getDoctor = async (req, res, next) => {
        try {
            const id = req.params.doctorId;
            if (!id) {
                throw new AppError("Doctor Id Required", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const { doctor, verificationHistory, documentUrl, totalAppointments, appointmentStatusDistribution, } = await this._getDoctorUseCase.execute(id);
            const response = GetDoctorMapper.toDto(doctor, documentUrl, verificationHistory, totalAppointments, appointmentStatusDistribution);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Doctor Found"));
        }
        catch (error) {
            next(error);
        }
    };
    getAllDoctors = async (req, res, next) => {
        try {
            const parsed = getAllDoctorSchema.safeParse(req.query);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const { doctors, page, limit, totalCount } = await this._getAllDoctorUseCase.execute(parsed.data);
            const response = {
                doctors,
                limit,
                page,
                totalCount,
            };
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.DOCTOR_FETCH_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    changeDoctorApprovalStatus = async (req, res, next) => {
        try {
            const doctorId = req.params.doctorId;
            if (!doctorId) {
                throw new AppError("Doctor Id is required", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const parsed = changeDoctorApprovalStatusSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._changeDoctorApprovalStatusUseCase.execute(parsed.data, doctorId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Doctor Approval status changed successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    toggleBlock = async (req, res, next) => {
        try {
            const { doctorId } = req.params;
            if (!doctorId) {
                throw new AppError("Invalid UserId", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._toggleBlockDoctorUseCase.execute(doctorId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.PATIENT_FETCH_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=doctor.controller.js.map