export interface IPatientUpdateProfilePictureUseCase {
  execute(
    doctorId: string,
    document: {
      buffer: Buffer;
      mimetype: string;
      originalname: string;
    }
  ): Promise<void>;
}
