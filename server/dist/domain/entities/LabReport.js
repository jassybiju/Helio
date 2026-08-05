import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export class LabReport {
    _id;
    _consultationId;
    _appointmentId;
    _doctorId;
    _patientId;
    _testName;
    _instructions;
    _status;
    _documentKey;
    _remarks;
    _requestedAt;
    _uploadedAt;
    _createdAt;
    _updatedAt;
    constructor(_id, _consultationId, _appointmentId, _doctorId, _patientId, _testName, _instructions, _status, _documentKey, _remarks, _requestedAt, _uploadedAt, _createdAt, _updatedAt) {
        this._id = _id;
        this._consultationId = _consultationId;
        this._appointmentId = _appointmentId;
        this._doctorId = _doctorId;
        this._patientId = _patientId;
        this._testName = _testName;
        this._instructions = _instructions;
        this._status = _status;
        this._documentKey = _documentKey;
        this._remarks = _remarks;
        this._requestedAt = _requestedAt;
        this._uploadedAt = _uploadedAt;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
    }
    uploadDocument(documentKey) {
        this._documentKey = documentKey;
        this._uploadedAt = new Date();
        this._status = LAB_REPORT_STATUS.UPLOADED;
    }
    static create({ id, consultationId, appointmentId, doctorId, patientId, testName, instructions, }) {
        return new LabReport(id, consultationId, appointmentId, doctorId, patientId, testName, instructions, LAB_REPORT_STATUS.REQUESTED, null, null, new Date(), null, null, null);
    }
    get id() {
        return this._id;
    }
    get consultationId() {
        return this._consultationId;
    }
    get appointmentId() {
        return this._appointmentId;
    }
    get doctorId() {
        return this._doctorId;
    }
    get patientId() {
        return this._patientId;
    }
    get testName() {
        return this._testName;
    }
    get instructions() {
        return this._instructions;
    }
    get status() {
        return this._status;
    }
    get documentKey() {
        return this._documentKey;
    }
    get remarks() {
        return this._remarks;
    }
    get requestedAt() {
        return this._requestedAt;
    }
    get uploadedAt() {
        return this._uploadedAt;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
}
//# sourceMappingURL=LabReport.js.map