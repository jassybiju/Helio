import type { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import type { IGetWalletDTO } from "./IGetWalletDTO.js";
export declare class GetWalletMapper {
    static toDto({ balance, transactions, totalCount, limit, page, }: {
        balance: number;
        transactions: WalletTransaction[];
        limit: number;
        page: number;
        totalCount: number;
    }): IGetWalletDTO;
}
//# sourceMappingURL=GetWalletMapper.d.ts.map