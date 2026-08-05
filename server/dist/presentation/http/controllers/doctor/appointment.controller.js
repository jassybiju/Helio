import { UnauthorizedError } from "#shared/errors/UnauthorizedError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class DoctorAppointmentController {
    _getAllAppointments;
    _getAppointment;
    _startConsultation;
    _viewTodaysAppointment;
    _skipAppointment;
    constructor(_getAllAppointments, _getAppointment, _startConsultation, _viewTodaysAppointment, _skipAppointment) {
        this._getAllAppointments = _getAllAppointments;
        this._getAppointment = _getAppointment;
        this._startConsultation = _startConsultation;
        this._viewTodaysAppointment = _viewTodaysAppointment;
        this._skipAppointment = _skipAppointment;
    }
    getTodaysAppointment = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new UnauthorizedError("Doctor Id Not Found");
            }
            const response = await this._viewTodaysAppointment.execute(doctorId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "DOCTOR TODAYS APPOINTEMNT GOT SUCCESFFULy"));
        }
        catch (error) {
            next(error);
        }
    };
    getAllAppointments = async (req, res, next) => {
        try {
            const query = req.query;
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new UnauthorizedError("Doctor Id Not Found");
            }
            const response = await this._getAllAppointments.execute(doctorId, query);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "DOCTOR APPOINTEMNT GOT SUCCESFFULy"));
        }
        catch (error) {
            next(error);
        }
    };
    getAppointment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new UnauthorizedError("Doctor Id Not Found");
            }
            const response = await this._getAppointment.execute(doctorId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "DOCTOR APPOINTEMNT GOT SUCCESFFULy"));
        }
        catch (error) {
            next(error);
        }
    };
    startConsultation = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new UnauthorizedError("Doctor Id Not Found");
            }
            const response = await this._startConsultation.execute(doctorId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "DOCTOR CONSULTATION STARTED SUCCESFFULy"));
        }
        catch (error) {
            next(error);
        }
    };
    skipAppointment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new UnauthorizedError("Doctor Id Not Found");
            }
            const response = await this._skipAppointment.execute(doctorId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "DOCTOR CONSULTATION SKIPPED SUCCESFFULy"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=appointment.controller.js.map