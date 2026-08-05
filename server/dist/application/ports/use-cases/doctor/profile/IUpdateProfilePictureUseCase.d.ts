export interface IDoctorUpdateProfilePictureUseCase {
    execute(doctorId: string, document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<void>;
}
//# sourceMappingURL=IUpdateProfilePictureUseCase.d.ts.map