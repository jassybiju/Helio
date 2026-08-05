import { Wallet } from "#domain/entities/Wallet.js";
export class WalletMapper {
    static toDomain(doc) {
        return new Wallet(doc._id, doc.user_id, doc.user_role, doc.balance, doc.created_at, doc.updated_at);
    }
    static toPersistence(wallet) {
        return {
            _id: wallet.id,
            user_id: wallet.userId,
            user_role: wallet.userRole,
            balance: wallet.balance,
            created_at: wallet.createdAt,
            updated_at: wallet.updatedAt,
        };
    }
}
//# sourceMappingURL=WalletMapper.js.map