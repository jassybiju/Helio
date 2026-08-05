import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import type { WalletTransactionDoc } from "#infrastructure/database/model/WalletTransactionModel.js";
export declare class WalletTransactionMapper {
    static toDomain(doc: WalletTransactionDoc): WalletTransaction;
    static toPersistence(tx: WalletTransaction): WalletTransactionDoc;
}
//# sourceMappingURL=WalletTransactionMapper.d.ts.map