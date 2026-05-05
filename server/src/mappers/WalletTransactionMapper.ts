import type { TRANSACTION_STATUS, WALLET_TYPE } from "@domain/common/enums/wallet.enum.ts";
import  { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import type { WalletTransactionDoc } from "@infrastructure/database/model/WalletTransactionModel.ts";

export class WalletTransactionMapper {
  static toDomain(doc: WalletTransactionDoc): WalletTransaction {
    return new WalletTransaction(
      doc._id,
      doc.wallet_id,
      doc.type as WALLET_TYPE,
      doc.amount,
      doc.status as TRANSACTION_STATUS,
      doc.reference_id ?? null,
      doc.description ?? null,
      doc.created_at
    );
  }

  static toPersistence(tx: WalletTransaction) : WalletTransactionDoc{
    return {
      _id: tx.id,
      wallet_id: tx.walletId,
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      reference_id: tx.referenceId,
      description: tx.description,
      created_at: tx.createdAt,
    };
  }
}