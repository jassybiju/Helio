import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import { AppError } from "@shared/errors/AppError.ts";
import bcrypt from "bcrypt";

export class BcryptPasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    try {
      const salt = process.env.BCRYPT_SALT || 10;
      console.log(salt);
      const hashedPassword = await bcrypt.hash(password, Number(salt));
      console.log(hashedPassword);
      return hashedPassword;
    } catch (error) {
      console.log(error);
      throw new AppError("Error is hashing password", 500);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      console.log(password, hash, await bcrypt.compare(password, hash));
      return await bcrypt.compare(password, hash);
    } catch {
      throw new AppError("Error in comparing password", 500);
    }
  }
}
