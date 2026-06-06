import { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";

export class LabReport {
  constructor(
    private readonly _id: string,
    private readonly _consultationId: string,
    private readonly _appointmentId: string,
    private readonly _doctorId: string,
    private readonly _patientId: string,
    private readonly _testName: string,
    private readonly _instructions: string | null,
    private _status: LAB_REPORT_STATUS,
    private _documentKey: string | null,
    private readonly _remarks: string | null,
    private readonly _requestedAt: Date,
    private _uploadedAt: Date | null,
    private readonly _createdAt: Date | null,
    private readonly _updatedAt: Date | null
  ) {}

  uploadDocument(documentKey: string) {
    this._documentKey = documentKey;
    this._uploadedAt = new Date();
    this._status = LAB_REPORT_STATUS.UPLOADED;
  }

  static create({
    id,
    consultationId,
    appointmentId,
    doctorId,
    patientId,
    testName,
    instructions,
  }: {
    id: string;
    consultationId: string;
    appointmentId: string;
    doctorId: string;
    patientId: string;
    testName: string;
    instructions: string;
  }) {
    return new LabReport(
      id,
      consultationId,
      appointmentId,
      doctorId,
      patientId,
      testName,
      instructions,
      LAB_REPORT_STATUS.REQUESTED,
      null,
      null,
      new Date(),
      null,
      null,
      null
    );
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
