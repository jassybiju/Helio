import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
export class WalletTransactionMapper {
    static toDomain(doc) {
        return new WalletTransaction(doc._id, doc.wallet_id, doc.type, doc.amount, doc.status, doc.reference_id ?? null, doc.description ?? null, doc.created_at);
    }
    static toPersistence(tx) {
        return {
            _id: tx.id,
            wallet_id: tx.walletId,
            type: tx.type,
            amount: tx.amount,
            status: tx.status,
            reference_id: tx.referenceId,
            description: tx.description,
            created_at: tx.createdAt,
            is_deleted: false,
        };
    }
}
//# sourceMappingURL=WalletTransactionMapper.js.map