export interface IFileUpload {
  upload(document: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }): Promise<string>;

  getFileUrl(filename: string): string;
}
