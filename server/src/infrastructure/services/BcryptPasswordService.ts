import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import { AppError } from "#shared/errors/AppError.js";
import bcrypt from "bcrypt";

export class BcryptPasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    try {
      const salt = process.env.BCRYPT_SALT || 10;
      const hashedPassword = await bcrypt.hash(password, Number(salt));
      return hashedPassword;
    } catch {
      throw new AppError("Error is hashing password", 500);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch {
      throw new AppError("Error in comparing password", 500);
    }
  }
}
