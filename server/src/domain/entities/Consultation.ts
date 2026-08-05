import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { Prescription } from "#domain/value-objects/Prescription.js";
import type { Vital } from "#domain/value-objects/Vitals.js";
import { ConflictError } from "#shared/errors/ConflictError.js";

export class Consultation {
  constructor(
    private readonly _id: string,
    private readonly _appointmentId: string,

    private readonly _doctorId: string,
    private readonly _patientId: string,

    private _vitals: Vital | null,

    private _primaryDiagnosis: string | null,
    private _clinicalObservation: string | null,
    private _generalAdvice: string | null,
    private _quickNote: string | null,

    private readonly _consultationType: CONSULTATION_TYPE,
    private _prescriptions: Prescription[],

    private _medicationPeriod: number | null,

    private readonly _startedAt: Date,
    private _endedAt: Date | null,

    private readonly _createdAt: Date
  ) {}

  end() {
    if (!this._medicationPeriod) {
      throw new ConflictError("Medication period not set");
    }

    if (
      !this._primaryDiagnosis ||
      !this._clinicalObservation ||
      !this._generalAdvice ||
      !this._quickNote
    ) {
      throw new ConflictError("Notes not added");
    }

    if (this._endedAt) {
      throw new ConflictError("Consultation already ended");
    }
    this._endedAt = new Date();
  }

  updateMedicationPeriod(period: number) {
    this._medicationPeriod = period;
  }
  addNotes(
    clinicalObservation: string | null,
    primaryDiagnosis: string | null,
    generalAdvice: string | null,
    quickNote: string | null
  ) {
    this._clinicalObservation = clinicalObservation;
    this._primaryDiagnosis = primaryDiagnosis;
    this._generalAdvice = generalAdvice;
    this._quickNote = quickNote;
  }

  addPrescription(prescription: Prescription) {
    if (
      this._prescriptions.some(
        (pres) =>
          pres.name.trim().toLowerCase() ===
          prescription.name.trim().toLowerCase()
      )
    ) {
      throw new ConflictError("Prescription with the name already exists");
    }

    this._prescriptions.push(prescription);
  }

  removePrescription(name: string) {
    if (
      this._prescriptions.filter(
        (pres) => pres.name.trim().toLowerCase() === name.trim().toLowerCase()
      ).length === 0
    ) {
      throw new ConflictError("Prescription with the name doesnt exist");
    }
    this._prescriptions = this._prescriptions.filter(
      (pres) => pres.name !== name
    );
  }
  ensureActive() {
    if (!this._startedAt || this._endedAt) {
      throw new ConflictError("Consultation not active");
    }
  }

  addVitals(vital: Vital) {
    this._vitals = vital;
  }

  static create({
    id,
    appointmentId,
    doctorId,
    patientId,
    consultationType,
    startedAt,
  }: {
    id: string;
    appointmentId: string;
    doctorId: string;
    patientId: string;
    consultationType: CONSULTATION_TYPE;
    startedAt: Date;
  }) {
    return new Consultation(
      id,
      appointmentId,
      doctorId,
      patientId,
      null,
      null,
      null,
      null,
      null,
      consultationType,
      [],
      null,
      startedAt,
      null,
      new Date()
    );
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
