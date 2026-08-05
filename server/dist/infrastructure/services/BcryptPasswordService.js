import { AppError } from "#shared/errors/AppError.js";
import bcrypt from "bcrypt";
export class BcryptPasswordService {
    async hash(password) {
        try {
            const salt = process.env.BCRYPT_SALT || 10;
            const hashedPassword = await bcrypt.hash(password, Number(salt));
            return hashedPassword;
        }
        catch {
            throw new AppError("Error is hashing password", 500);
        }
    }
    async compare(password, hash) {
        try {
            return await bcrypt.compare(password, hash);
        }
        catch {
            throw new AppError("Error in comparing password", 500);
        }
    }
}
//# sourceMappingURL=BcryptPasswordService.js.map