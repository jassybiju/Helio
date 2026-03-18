import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

export class S3FileUploadService implements IFileUpload {
  async upload(document: {
    buffer: Buffer;
    mimetype: string;
    filename: string;
  }): Promise<string> {
    return "123";
  }
}
