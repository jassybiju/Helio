import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

export class LocalFileUploadService implements IFileUpload {
  private _uploadDir: string;
  private _baseUrl: string;

  constructor() {
    this._uploadDir = path.join(process.cwd(), "uploads");

    this._baseUrl = process.env.BASE_URL || "http://localhost:5000";

    if (!fs.existsSync(this._uploadDir)) {
      fs.mkdirSync(this._uploadDir, { recursive: true });
    }
  }

  async upload(document: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }): Promise<string> {
    const { buffer, originalname } = document;

    const uniqueNamme = `${randomUUID()}-${originalname}`;
    const filePath = path.join(this._uploadDir, uniqueNamme);

    await fs.promises.writeFile(filePath, buffer);

    return uniqueNamme;
  }

  async getFileUrl(filename: string): Promise<string> {
    return `${this._baseUrl}/uploads/${filename}`;
  }
}
