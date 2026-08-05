import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { createPatientAppointmentSchema } from "../../../schemas/patient/appointment.schema.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class PatientAppointmentController {
    _createAppointment;
    _getAppointment;
    _checkout;
    _getAllAppointment;
    _liveQueue;
    _verifyPayment;
    _getRescheduleSlots;
    _rescheduleAppointment;
    _cancelAndRefundAppointment;
    _patientCancelAppointment;
    _patientRescheduleAppointment;
    constructor(_createAppointment, _getAppointment, _checkout, _getAllAppointment, _liveQueue, _verifyPayment, _getRescheduleSlots, _rescheduleAppointment, _cancelAndRefundAppointment, _patientCancelAppointment, _patientRescheduleAppointment) {
        this._createAppointment = _createAppointment;
        this._getAppointment = _getAppointment;
        this._checkout = _checkout;
        this._getAllAppointment = _getAllAppointment;
        this._liveQueue = _liveQueue;
        this._verifyPayment = _verifyPayment;
        this._getRescheduleSlots = _getRescheduleSlots;
        this._rescheduleAppointment = _rescheduleAppointment;
        this._cancelAndRefundAppointment = _cancelAndRefundAppointment;
        this._patientCancelAppointment = _patientCancelAppointment;
        this._patientRescheduleAppointment = _patientRescheduleAppointment;
    }
    patientRescheduleAppointment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const data = req.body;
            const response = await this._patientRescheduleAppointment.execute(patientId, appointmentId, data);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "APPOINTMENT RESCHEUDULED SUCCESS"));
        }
        catch (error) {
            next(error);
        }
    };
    patientCancelAppointment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const response = await this._patientCancelAppointment.execute(patientId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "APPOINTMENT CANCELLED SUCCESS"));
        }
        catch (error) {
            next(error);
        }
    };
    cancelAndRefundAppointment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const response = await this._cancelAndRefundAppointment.execute(patientId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "APPOINTMENT CANCELLED SUCCESS"));
        }
        catch (error) {
            next(error);
        }
    };
    rescheduleAppointment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const data = req.body;
            const response = await this._rescheduleAppointment.execute(patientId, appointmentId, data);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "APPOINTMENT RESCHEUDULED SUCCESS"));
        }
        catch (error) {
            next(error);
        }
    };
    getRescheduleSlots = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const response = await this._getRescheduleSlots.execute(patientId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "GET RESCHEDULE SLOTS"));
        }
        catch (error) {
            next(error);
        }
    };
    liveQueue = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const response = await this._liveQueue.execute(appointmentId, patientId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "LIVE QUEUE GOT SUCCESFFUlly"));
        }
        catch (error) {
            next(error);
        }
    };
    verifyPayment = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const body = req.body;
            const response = await this._verifyPayment.execute({
                appointmentId: appointmentId,
                patientId: patientId,
                razorpay_order_id: body.razorpay_order_id,
                razorpay_payment_id: body.razorpay_payment_id,
                razorpay_signature: body.razorpay_signature,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Payment Verified Suceesful"));
        }
        catch (error) {
            next(error);
        }
    };
    getAll = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            const query = req.query;
            const response = await this._getAllAppointment.execute(patientId, query);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Doctor fetched successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    createAppointment = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            if (!patientId) {
                throw new AppError("Patient Id Requried", HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = createPatientAppointmentSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._createAppointment.execute(patientId, parsed.data);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Appointment Created"));
        }
        catch (error) {
            next(error);
        }
    };
    getAppointment = async (req, res, next) => {
        try {
            const patientId = req.user?.id;
            if (!patientId) {
                throw new AppError("Patient Id Requried", HTTPStatus.INTERNAL_ERROR);
            }
            const { appointmentId } = req.params;
            if (!appointmentId) {
                throw new AppError("appointment Id Requried", HTTPStatus.INTERNAL_ERROR);
            }
            const response = await this._getAppointment.execute(patientId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Appointment Got Successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    checkout = async (req, res, next) => {
        try {
            const { appointmentId } = req.params;
            const patientId = req.user?.id;
            const { type } = req.body;
            const response = await this._checkout.execute(appointmentId, patientId, type);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Checkout Suceesful"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=appointment.controller.js.map