export interface IFileUpload {
    upload(document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }, secured?: boolean): Promise<string>;
    getFileUrl(filename: string, signed?: boolean): string;
}
//# sourceMappingURL=IFileUpload.d.ts.map