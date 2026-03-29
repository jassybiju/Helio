import type { USER_ROLES } from "@shared/types/UserRoles.ts";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
      user?: {
        id: string;
        role: USER_ROLES;
      };
    }
  }
}
export {};
