import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { ICreateAdminUseCase } from "#application/ports/use-cases/admin/ICreateAdminUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Admin } from "#domain/entities/Admin.js";
import { Wallet } from "#domain/entities/Wallet.js";

export class CreateAdminUseCase implements ICreateAdminUseCase {
  constructor(
    private readonly _adminRepo: IAdminRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _passwordService: IPasswordService,
    private readonly _walletRepo: IWalletRepository
  ) {}
  async execute(email: string, password: string): Promise<void> {
    if (!process.env.ADMIN_PREFIX) {
      throw new Error("ADMIN PREFIX NOT SET");
    }
    const adminID = this._idGenerator.generate(process.env.ADMIN_PREFIX!);

    const hashedPassword = await this._passwordService.hash(password);
    const admin = Admin.create(adminID, email, hashedPassword);
    const walletId = this._idGenerator.generate(process.env.WALLET_PREFIX!);
    const wallet = Wallet.create({
      id: walletId,
      userId: admin.id,
      userRole: USER_ROLES.ADMIN,
    });

    await this._adminRepo.create(admin);
    await this._walletRepo.create(wallet);
  }
}
