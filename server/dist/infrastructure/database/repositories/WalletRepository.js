import { BaseRepository } from "./BaseRepository.js";
import { walletModel } from "../model/WalletModel.js";
import { WalletMapper } from "../../../mappers/WalletMapper.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class WalletRepository extends BaseRepository {
    _logger;
    constructor(_logger, session = null) {
        super(walletModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new WalletRepository(this._logger, session);
    }
    findAdminWallet() {
        return super.findOne({ user_role: USER_ROLES.ADMIN }, WalletMapper.toDomain);
    }
    findByUserId(userId) {
        this._logger.info("Fetching Wallet By User ID", { userId });
        return super.findOne({ user_id: userId }, WalletMapper.toDomain);
    }
    async create(wallet) {
        this._logger.info("Creating Wallet", { wallet });
        await super.create(wallet, WalletMapper.toPersistence);
    }
    findById(id) {
        this._logger.info("Fetching Wallet By  ID", { id });
        return super.findById(id, WalletMapper.toDomain);
    }
    async update(wallet) {
        this._logger.info("Updating Wallet By ID", { wallet });
        await super.update(wallet, wallet.id, WalletMapper.toPersistence);
    }
    async delete(id) {
        this._logger.info("Deleting Wallet By ID", { id });
        await super.delete(id);
    }
    async existsByUserId(userId) {
        const doc = await super.findOne({ user_id: userId }, WalletMapper.toDomain);
        if (!doc)
            return false;
        return true;
    }
}
//# sourceMappingURL=WalletRepository.js.map