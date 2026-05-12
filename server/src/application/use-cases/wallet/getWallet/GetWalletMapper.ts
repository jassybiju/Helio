import type { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import type { IGetWalletDTO } from "./IGetWalletDTO.ts";

export class GetWalletMapper {
  static toDto({
    balance,
    transactions,
    totalCount,
    limit,
    page,
  }: {
    balance: number;
    transactions: WalletTransaction[];
    limit: number;
    page: number;
    totalCount: number;
  }): IGetWalletDTO {
    return {
      balance: balance,
      transactions: transactions.map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
        date: transaction.createdAt.toISOString(),
        type: transaction.type,
      })),
      limit,
      totalCount,
      page,
    };
  }
}
