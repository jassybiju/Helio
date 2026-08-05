import { LoginAdminUseCase } from "#application/use-cases/admin/auth/LoginAdminUseCase.js";
import { AdminAuthController } from "../../controllers/admin/auth.controller.js";
import { CryptoRefreshTokenService } from "#infrastructure/services/CryptoRefreshTokenService.js";
import { JWTAccessTokenService } from "#infrastructure/services/JWTAccessTokenService.js";
import { RedisSessionRepository } from "#infrastructure/database/repositories/RedisSessionRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { BcryptPasswordService } from "#infrastructure/services/BcryptPasswordService.js";
import { AdminRepository } from "#infrastructure/database/repositories/AdminRepository.js";
const refreshTokenService = new CryptoRefreshTokenService();
const accessTokenService = new JWTAccessTokenService();
const loggerService = PinoLoggerService.getInstance();
const passwordService = new BcryptPasswordService();
const sessionRepo = new RedisSessionRepository(loggerService);
const adminRepo = new AdminRepository();
const loginAdminUseCase = new LoginAdminUseCase(loggerService, accessTokenService, refreshTokenService, adminRepo, passwordService, sessionRepo);
export const adminAuthController = new AdminAuthController(loginAdminUseCase);
//# sourceMappingURL=auth.di.js.map