import type { TRANSACTION_TYPE } from "@domain/common/enums/wallet.enum.ts";

export interface IGetWalletDTO {
  transactions: {
    id: string;
    amount: number;
    type: TRANSACTION_TYPE;
    date: string;
  }[];
  balance: number;
  totalCount: number;
  page: number;
  limit: number;
}
