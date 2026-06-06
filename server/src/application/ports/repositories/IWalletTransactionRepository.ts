import type { TRANSACTION_TYPE } from "@domain/common/enums/wallet.enum.ts";
import type { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import type { ClientSession } from "mongoose";

export interface ITransactionFilter {
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  type?: TRANSACTION_TYPE | undefined;
  order: "asc" | "desc";
  page: number;
  limit: number;
}

export interface IWalletTransactionRepository {
  withSession(session: ClientSession): IWalletTransactionRepository;

  create(transaction: WalletTransaction): Promise<void>;

  findById(id: string): Promise<WalletTransaction | null>;

  findByWalletId(walletId: string): Promise<WalletTransaction[]>;

  findByReferenceId(referenceId: string): Promise<WalletTransaction | null>;

  update(transaction: WalletTransaction): Promise<void>;

  delete(id: string): Promise<void>;

  findAllWithFilters(
    walletId: string,
    params: ITransactionFilter
  ): Promise<{ transactions: WalletTransaction[]; totalCount: number }>;
}
