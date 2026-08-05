import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { NextFunction, Request, Response } from "express";
export declare const authorizeMiddleware: (role: USER_ROLES | USER_ROLES[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.middleware.d.ts.map