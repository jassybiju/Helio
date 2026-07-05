import type { IAdminRepository } from "@application/ports/repositories/IAdminRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { IPasswordService } from "@application/ports/services/IPasswordService.ts";
import type { ICreateAdminUseCase } from "@application/ports/use-cases/admin/ICreateAdminUseCase.ts";
import { Admin } from "@domain/entities/Admin.ts";

export class CreateAdminUseCase implements ICreateAdminUseCase {
  constructor(
    private readonly _adminRepo: IAdminRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _passwordService: IPasswordService
  ) {}
  async execute(email: string, password: string): Promise<void> {
    if (!process.env.ADMIN_PREFIX) {
      throw new Error("ADMIN PREFIX NOT SET");
    }
    const adminID = this._idGenerator.generate(process.env.ADMIN_PREFIX!);

    const hashedPassword = await this._passwordService.hash(password);
    const admin = Admin.create(adminID, email, hashedPassword);

    await this._adminRepo.create(admin);
  }
}
