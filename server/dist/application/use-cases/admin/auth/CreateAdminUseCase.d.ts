import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { ICreateAdminUseCase } from "#application/ports/use-cases/admin/ICreateAdminUseCase.js";
export declare class CreateAdminUseCase implements ICreateAdminUseCase {
    private readonly _adminRepo;
    private readonly _idGenerator;
    private readonly _passwordService;
    private readonly _walletRepo;
    constructor(_adminRepo: IAdminRepository, _idGenerator: IIDGenerator, _passwordService: IPasswordService, _walletRepo: IWalletRepository);
    execute(email: string, password: string): Promise<void>;
}
//# sourceMappingURL=CreateAdminUseCase.d.ts.map