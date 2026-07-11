import { CreateAdminUseCase } from "@application/use-cases/admin/auth/CreateAdminUseCase.ts";
import { connectDB } from "@config/mongo.config.ts";
import { AdminRepository } from "@infrastructure/database/repositories/AdminRepository.ts";
import { WalletRepository } from "@infrastructure/database/repositories/WalletRepository.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";

await connectDB();

const logger = PinoLoggerService.getInstance()
const adminRepo = new AdminRepository();
const idGenerator = new NanoidGenerator();
const passwordService = new BcryptPasswordService();
const walletRepo = new WalletRepository(logger)
const createAdminUseCase = new CreateAdminUseCase(
  adminRepo,
  idGenerator,
  passwordService,
  walletRepo
);

await createAdminUseCase.execute("admin@email.com", "secret");

console.log("CREATED ADMIN");
