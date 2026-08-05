import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
export class LocalFileUploadService {
    _uploadDir;
    _baseUrl;
    constructor() {
        this._uploadDir = path.join(process.cwd(), "uploads");
        this._baseUrl = process.env.BASE_URL || "http://localhost:5000";
        if (!fs.existsSync(this._uploadDir)) {
            fs.mkdirSync(this._uploadDir, { recursive: true });
        }
    }
    async upload(document) {
        const { buffer, originalname } = document;
        const uniqueNamme = `${randomUUID()}-${originalname}`;
        const filePath = path.join(this._uploadDir, uniqueNamme);
        await fs.promises.writeFile(filePath, buffer);
        return uniqueNamme;
    }
    getFileUrl(filename) {
        return `${this._baseUrl}/uploads/${filename}`;
    }
}
//# sourceMappingURL=LocalFileUploadService.js.map