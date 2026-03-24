import { LoginAdminUseCase } from "@application/use-cases/admin/auth/LoginAdminUseCase.ts";
import { AdminAuthController } from "../../controllers/admin/auth.controller.ts";
import { CryptoRefreshTokenService } from "@infrastructure/services/CryptoRefreshTokenService.ts";
import { JWTAccessTokenService } from "@infrastructure/services/JWTAccessTokenService.ts";
import { RedisSessionRepository } from "@infrastructure/database/repositories/RedisSessionRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";

const refreshTokenService = new CryptoRefreshTokenService();
const accessTokenService = new JWTAccessTokenService();
const loggerService = new PinoLoggerService();

const sessionRepo = new RedisSessionRepository(loggerService);

const loginAdminUseCase = new LoginAdminUseCase(
  loggerService,
  accessTokenService,
  refreshTokenService,
  sessionRepo
);

export const adminAuthController = new AdminAuthController(loginAdminUseCase);
