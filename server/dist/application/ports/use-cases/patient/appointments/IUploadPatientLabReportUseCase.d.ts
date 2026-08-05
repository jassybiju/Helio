export interface IUploadPatientLabReportUseCase {
    execute(patientId: string, reportId: string, document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<void>;
}
//# sourceMappingURL=IUploadPatientLabReportUseCase.d.ts.map