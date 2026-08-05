import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Admin } from "#domain/entities/Admin.js";
import { Wallet } from "#domain/entities/Wallet.js";
export class CreateAdminUseCase {
    _adminRepo;
    _idGenerator;
    _passwordService;
    _walletRepo;
    constructor(_adminRepo, _idGenerator, _passwordService, _walletRepo) {
        this._adminRepo = _adminRepo;
        this._idGenerator = _idGenerator;
        this._passwordService = _passwordService;
        this._walletRepo = _walletRepo;
    }
    async execute(email, password) {
        if (!process.env.ADMIN_PREFIX) {
            throw new Error("ADMIN PREFIX NOT SET");
        }
        const adminID = this._idGenerator.generate(process.env.ADMIN_PREFIX);
        const hashedPassword = await this._passwordService.hash(password);
        const admin = Admin.create(adminID, email, hashedPassword);
        const walletId = this._idGenerator.generate(process.env.WALLET_PREFIX);
        const wallet = Wallet.create({
            id: walletId,
            userId: admin.id,
            userRole: USER_ROLES.ADMIN,
        });
        await this._adminRepo.create(admin);
        await this._walletRepo.create(wallet);
    }
}
//# sourceMappingURL=CreateAdminUseCase.js.map