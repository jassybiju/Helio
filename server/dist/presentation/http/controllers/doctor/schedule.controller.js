import { setDoctorScheduleSchema } from "../../schemas/doctor/schedule.schema.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "#shared/errors/AppError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { GetDoctorScheduleMapper } from "#application/use-cases/doctor/schedule/getDoctorSchedule/GetDoctorScheduleMapper.js";
export class DoctorScheduleController {
    _setSchedule;
    _getSchedule;
    _deleteSchedule;
    constructor(_setSchedule, _getSchedule, _deleteSchedule) {
        this._setSchedule = _setSchedule;
        this._getSchedule = _getSchedule;
        this._deleteSchedule = _deleteSchedule;
    }
    setSchedule = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = setDoctorScheduleSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            await this._setSchedule.execute(doctorId, parsed.data);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.DOCTOR_SCHEDULE_CREATED));
        }
        catch (error) {
            next(error);
        }
    };
    getSchedule = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const shifts = await this._getSchedule.execute(doctorId);
            const response = GetDoctorScheduleMapper.toDto(shifts);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.DOCTOR_SCHEDULE_SUCCESS));
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            const shiftId = req.params.shiftId;
            if (!doctorId || !shiftId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            await this._deleteSchedule.execute(shiftId, doctorId);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, MESSAGE.DOCTOR_SCHEDULE_DELETED));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=schedule.controller.js.map