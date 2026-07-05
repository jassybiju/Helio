import { CreateAdminUseCase } from "@application/use-cases/admin/auth/CreateAdminUseCase.ts";
import { connectDB } from "@config/mongo.config.ts";
import { AdminRepository } from "@infrastructure/database/repositories/AdminRepository.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";

await connectDB();

const adminRepo = new AdminRepository();
const idGenerator = new NanoidGenerator();
const passwordService = new BcryptPasswordService();
const createAdminUseCase = new CreateAdminUseCase(
  adminRepo,
  idGenerator,
  passwordService
);

await createAdminUseCase.execute("admin@email.com", "secret");

console.log("CREATED ADMIN");
