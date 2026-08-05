import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class ConsultationController {
    _endConsultation;
    _viewConsultation;
    _updateVitals;
    _addPrescription;
    _removePrescription;
    _updateNotes;
    _addTest;
    _removeTest;
    _viewHistory;
    constructor(_endConsultation, _viewConsultation, _updateVitals, _addPrescription, _removePrescription, _updateNotes, _addTest, _removeTest, _viewHistory) {
        this._endConsultation = _endConsultation;
        this._viewConsultation = _viewConsultation;
        this._updateVitals = _updateVitals;
        this._addPrescription = _addPrescription;
        this._removePrescription = _removePrescription;
        this._updateNotes = _updateNotes;
        this._addTest = _addTest;
        this._removeTest = _removeTest;
        this._viewHistory = _viewHistory;
    }
    updateNotes = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const data = req.body;
            const response = await this._updateNotes.execute(doctorId, appointmentId, data);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Consultation notes updated Success"));
        }
        catch (error) {
            next(error);
        }
    };
    viewConsultation = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const response = await this._viewConsultation.execute(doctorId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "View Consultation Success"));
        }
        catch (error) {
            next(error);
        }
    };
    endConsultation = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const response = await this._endConsultation.execute(doctorId, appointmentId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Consultation ended Success"));
        }
        catch (error) {
            next(error);
        }
    };
    updateVitals = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const response = await this._updateVitals.execute(doctorId, appointmentId, req.body);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Consultation Vitals Updated Success"));
        }
        catch (error) {
            next(error);
        }
    };
    addPrescription = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const response = await this._addPrescription.execute(doctorId, appointmentId, req.body);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Consultation Prescription Added Success"));
        }
        catch (error) {
            next(error);
        }
    };
    removePrescription = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId, prescriptionName } = req.params;
            const response = await this._removePrescription.execute(doctorId, appointmentId, prescriptionName);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Consultation Prescription Removed Success"));
        }
        catch (error) {
            next(error);
        }
    };
    addTest = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const response = await this._addTest.execute(doctorId, appointmentId, req.body);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Consultation Prescription Added Success"));
        }
        catch (error) {
            next(error);
        }
    };
    removeTest = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId, testId } = req.params;
            const response = await this._removeTest.execute(doctorId, appointmentId, testId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Lab Report Removed Success"));
        }
        catch (error) {
            next(error);
        }
    };
    viewHistory = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            const { page, limit } = req.query;
            if (!doctorId) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const { appointmentId } = req.params;
            const response = await this._viewHistory.execute(doctorId, appointmentId, Number(page), Number(limit));
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Lab Report Removed Success"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=consultation.controller.js.map