import type { HTTPStatus } from "../types/HTTPStatus.js";
export declare class AppError extends Error {
    statusCode: HTTPStatus;
    constructor(message: string, statusCode: HTTPStatus);
}
//# sourceMappingURL=AppError.d.ts.map