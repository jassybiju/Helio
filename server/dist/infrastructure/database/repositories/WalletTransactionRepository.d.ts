import type { ITransactionFilter, IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { type WalletTransactionDoc } from "../model/WalletTransactionModel.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession } from "mongoose";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
export declare class WalletTransactionRepository extends BaseRepository<WalletTransaction, WalletTransactionDoc> implements IWalletTransactionRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession | null);
    withSession(session: ClientSession): IWalletTransactionRepository;
    create(transaction: WalletTransaction): Promise<void>;
    findById(id: string): Promise<WalletTransaction | null>;
    findByWalletId(walletId: string): Promise<WalletTransaction[]>;
    findByReferenceId(referenceId: string): Promise<WalletTransaction | null>;
    findAllWithFilters(walletId: string, params: ITransactionFilter): Promise<{
        transactions: WalletTransaction[];
        totalCount: number;
    }>;
    update(transaction: WalletTransaction): Promise<void>;
    findNWithWalletId(walletId: string, n: number): Promise<WalletTransaction[]>;
    delete(id: string): Promise<void>;
    getRevenueAnalytics(period: BOOKING_PERIOD): Promise<{
        labels: string[];
        platformRevenue: number[];
    }>;
}
//# sourceMappingURL=WalletTransactionRepository.d.ts.map