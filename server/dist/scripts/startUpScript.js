import { CreateAdminUseCase } from "#application/use-cases/admin/auth/CreateAdminUseCase.js";
import { connectDB } from "#config/mongo.config.js";
import { AdminRepository } from "#infrastructure/database/repositories/AdminRepository.js";
import { WalletRepository } from "#infrastructure/database/repositories/WalletRepository.js";
import { BcryptPasswordService } from "#infrastructure/services/BcryptPasswordService.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
await connectDB();
const logger = PinoLoggerService.getInstance();
const adminRepo = new AdminRepository();
const idGenerator = new NanoidGenerator();
const passwordService = new BcryptPasswordService();
const walletRepo = new WalletRepository(logger);
const createAdminUseCase = new CreateAdminUseCase(adminRepo, idGenerator, passwordService, walletRepo);
await createAdminUseCase.execute("admin@email.com", "secret");
logger.info("CREATED ADMIN");
//# sourceMappingURL=startUpScript.js.map