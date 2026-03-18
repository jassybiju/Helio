export interface IFileUpload {
  upload(document: {
    buffer: Buffer;
    mimetype: string;
    filename: string;
  }): Promise<string>;
}
