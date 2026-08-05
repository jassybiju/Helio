import type { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
export interface IGetWalletDTO {
    transactions: {
        id: string;
        amount: number;
        type: TRANSACTION_TYPE;
        date: string;
        description: string | null;
    }[];
    balance: number;
    totalCount: number;
    page: number;
    limit: number;
}
//# sourceMappingURL=IGetWalletDTO.d.ts.map