import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

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
