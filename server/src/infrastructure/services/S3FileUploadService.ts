import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

export class S3FileUploadService implements IFileUpload {
  async upload(_document: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }): Promise<string> {
    return "123";
  }

  getFileUrl(_filename: string): string {
    throw new Error("Didnt implement");
  }
}
