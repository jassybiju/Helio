import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
export declare const validate: (schema: ZodType<{
    body?: unknown;
    params?: Record<string, string>;
    query?: unknown;
}>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map