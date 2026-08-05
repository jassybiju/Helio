import { ConflictError } from "#shared/errors/ConflictError.js";
export class Consultation {
    _id;
    _appointmentId;
    _doctorId;
    _patientId;
    _vitals;
    _primaryDiagnosis;
    _clinicalObservation;
    _generalAdvice;
    _quickNote;
    _consultationType;
    _prescriptions;
    _medicationPeriod;
    _startedAt;
    _endedAt;
    _createdAt;
    constructor(_id, _appointmentId, _doctorId, _patientId, _vitals, _primaryDiagnosis, _clinicalObservation, _generalAdvice, _quickNote, _consultationType, _prescriptions, _medicationPeriod, _startedAt, _endedAt, _createdAt) {
        this._id = _id;
        this._appointmentId = _appointmentId;
        this._doctorId = _doctorId;
        this._patientId = _patientId;
        this._vitals = _vitals;
        this._primaryDiagnosis = _primaryDiagnosis;
        this._clinicalObservation = _clinicalObservation;
        this._generalAdvice = _generalAdvice;
        this._quickNote = _quickNote;
        this._consultationType = _consultationType;
        this._prescriptions = _prescriptions;
        this._medicationPeriod = _medicationPeriod;
        this._startedAt = _startedAt;
        this._endedAt = _endedAt;
        this._createdAt = _createdAt;
    }
    end() {
        if (!this._medicationPeriod) {
            throw new ConflictError("Medication period not set");
        }
        if (!this._primaryDiagnosis ||
            !this._clinicalObservation ||
            !this._generalAdvice ||
            !this._quickNote) {
            throw new ConflictError("Notes not added");
        }
        if (this._endedAt) {
            throw new ConflictError("Consultation already ended");
        }
        this._endedAt = new Date();
    }
    updateMedicationPeriod(period) {
        this._medicationPeriod = period;
    }
    addNotes(clinicalObservation, primaryDiagnosis, generalAdvice, quickNote) {
        this._clinicalObservation = clinicalObservation;
        this._primaryDiagnosis = primaryDiagnosis;
        this._generalAdvice = generalAdvice;
        this._quickNote = quickNote;
    }
    addPrescription(prescription) {
        if (this._prescriptions.some((pres) => pres.name.trim().toLowerCase() ===
            prescription.name.trim().toLowerCase())) {
            throw new ConflictError("Prescription with the name already exists");
        }
        this._prescriptions.push(prescription);
    }
    removePrescription(name) {
        if (this._prescriptions.filter((pres) => pres.name.trim().toLowerCase() === name.trim().toLowerCase()).length === 0) {
            throw new ConflictError("Prescription with the name doesnt exist");
        }
        this._prescriptions = this._prescriptions.filter((pres) => pres.name !== name);
    }
    ensureActive() {
        if (!this._startedAt || this._endedAt) {
            throw new ConflictError("Consultation not active");
        }
    }
    addVitals(vital) {
        this._vitals = vital;
    }
    static create({ id, appointmentId, doctorId, patientId, consultationType, startedAt, }) {
        return new Consultation(id, appointmentId, doctorId, patientId, null, null, null, null, null, consultationType, [], null, startedAt, null, new Date());
    }
    get id() {
        return this._id;
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
    get vitals() {
        return this._vitals;
    }
    get primaryDiagnosis() {
        return this._primaryDiagnosis;
    }
    get clinicalObservation() {
        return this._clinicalObservation;
    }
    get generalAdvice() {
        return this._generalAdvice;
    }
    get quickNote() {
        return this._quickNote;
    }
    get consultationType() {
        return this._consultationType;
    }
    get prescriptions() {
        return this._prescriptions;
    }
    get medicationPeriod() {
        return this._medicationPeriod;
    }
    get startedAt() {
        return this._startedAt;
    }
    get endedAt() {
        return this._endedAt;
    }
    get createdAt() {
        return this._createdAt;
    }
}
//# sourceMappingURL=Consultation.js.map