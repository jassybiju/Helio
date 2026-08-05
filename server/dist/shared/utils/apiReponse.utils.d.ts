import type { APIResponse } from "#shared/types/APIResponse.js";
import type { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { Response } from "express";
export declare function successResponse<T>(data: T, message: string): APIResponse<T>;
export declare function errorResponse(message: string, error?: unknown): APIResponse<null>;
export declare function apiResponse<T>(res: Response, status: HTTPStatus, json: APIResponse<T>): Response<any, Record<string, any>>;
export declare function sendToken(res: Response, accessToken: string, refreshToken: string): void;
export declare function removeToken(res: Response): void;
//# sourceMappingURL=apiReponse.utils.d.ts.map