import type {
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from "#domain/common/enums/wallet.enum.js";
import type { WalletTransaction } from "#domain/entities/WalletTransaction.js";

export type IGetWalletInput = {
  type?: TRANSACTION_TYPE | undefined;
  status?: TRANSACTION_STATUS | undefined;
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  order?: "asc" | "desc" | undefined;
};

export interface IGetWalletUseCase {
  execute(
    userId: string,
    input: IGetWalletInput
  ): Promise<{
    balance: number;
    transactions: WalletTransaction[];
    page: number;
    totalCount: number;
    limit: number;
  }>;
}
