import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export declare class LabReport {
    private readonly _id;
    private readonly _consultationId;
    private readonly _appointmentId;
    private readonly _doctorId;
    private readonly _patientId;
    private readonly _testName;
    private readonly _instructions;
    private _status;
    private _documentKey;
    private readonly _remarks;
    private readonly _requestedAt;
    private _uploadedAt;
    private readonly _createdAt;
    private readonly _updatedAt;
    constructor(_id: string, _consultationId: string, _appointmentId: string, _doctorId: string, _patientId: string, _testName: string, _instructions: string | null, _status: LAB_REPORT_STATUS, _documentKey: string | null, _remarks: string | null, _requestedAt: Date, _uploadedAt: Date | null, _createdAt: Date | null, _updatedAt: Date | null);
    uploadDocument(documentKey: string): void;
    static create({ id, consultationId, appointmentId, doctorId, patientId, testName, instructions, }: {
        id: string;
        consultationId: string;
        appointmentId: string;
        doctorId: string;
        patientId: string;
        testName: string;
        instructions: string;
    }): LabReport;
    get id(): string;
    get consultationId(): string;
    get appointmentId(): string;
    get doctorId(): string;
    get patientId(): string;
    get testName(): string;
    get instructions(): string | null;
    get status(): LAB_REPORT_STATUS;
    get documentKey(): string | null;
    get remarks(): string | null;
    get requestedAt(): Date;
    get uploadedAt(): Date | null;
    get createdAt(): Date | null;
    get updatedAt(): Date | null;
}
//# sourceMappingURL=LabReport.d.ts.map