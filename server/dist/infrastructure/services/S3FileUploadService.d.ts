import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class S3FileUploadService implements IFileUpload {
    upload(_document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<string>;
    getFileUrl(_filename: string): string;
}
//# sourceMappingURL=S3FileUploadService.d.ts.map