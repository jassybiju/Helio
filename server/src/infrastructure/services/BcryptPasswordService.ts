import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import { AppError } from "@shared/errors/AppError.ts";
import bcrypt from "bcrypt";

export class BcryptPasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    try {
      const salt = process.env.BCRYPT_SALT || 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      return hashedPassword;
    } catch {
      throw new AppError("Error is hashing password", 500);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      console.log(password, hash, await bcrypt.compare(password, hash));
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new AppError("Error in comparing password", 500);
    }
  }
}
