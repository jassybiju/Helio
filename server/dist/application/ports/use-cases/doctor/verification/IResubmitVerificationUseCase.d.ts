export interface IResubmitVerificationUseCase {
    execute(doctorId: string, input: {
        document: {
            buffer: Buffer;
            mimetype: string;
            originalname: string;
        };
        additionalInfo: string;
    }): Promise<void>;
}
//# sourceMappingURL=IResubmitVerificationUseCase.d.ts.map