import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class LocalFileUploadService implements IFileUpload {
    private _uploadDir;
    private _baseUrl;
    constructor();
    upload(document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<string>;
    getFileUrl(filename: string): string;
}
//# sourceMappingURL=LocalFileUploadService.d.ts.map