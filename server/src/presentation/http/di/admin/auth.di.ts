import { LoginAdminUseCase } from "@application/use-cases/admin/auth/LoginAdminUseCase.ts";
import { AdminAuthController } from "../../controllers/admin/auth.controller.ts";
import { CryptoRefreshTokenService } from "@infrastructure/services/CryptoRefreshTokenService.ts";
import { JWTAccessTokenService } from "@infrastructure/services/JWTAccessTokenService.ts";
import { RedisSessionRepository } from "@infrastructure/database/repositories/RedisSessionRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { AdminRepository } from "@infrastructure/database/repositories/AdminRepository.ts";

const refreshTokenService = new CryptoRefreshTokenService();
const accessTokenService = new JWTAccessTokenService();
const loggerService = new PinoLoggerService();
const passwordService = new BcryptPasswordService();

const sessionRepo = new RedisSessionRepository(loggerService);
const adminRepo = new AdminRepository();

const loginAdminUseCase = new LoginAdminUseCase(
  loggerService,
  accessTokenService,
  refreshTokenService,
  adminRepo,
  passwordService,
  sessionRepo
);

export const adminAuthController = new AdminAuthController(loginAdminUseCase);
