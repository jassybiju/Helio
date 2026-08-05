import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class CloudinaryFileUploadService implements IFileUpload {
    constructor();
    upload(document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }, secured?: boolean): Promise<string>;
    getFileUrl(filename: string, secured?: boolean): string;
}
//# sourceMappingURL=CloudinaryFileUploadService.d.ts.map