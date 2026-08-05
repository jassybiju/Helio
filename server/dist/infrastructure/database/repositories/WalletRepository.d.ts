import type { Wallet } from "#domain/entities/Wallet.js";
import { BaseRepository } from "./BaseRepository.js";
import { type WalletDoc } from "../model/WalletModel.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { ClientSession } from "mongoose";
import type { ILogger } from "#application/ports/services/ILogger.js";
export declare class WalletRepository extends BaseRepository<Wallet, WalletDoc> implements IWalletRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession | null);
    withSession(session: ClientSession): IWalletRepository;
    findAdminWallet(): Promise<Wallet | null>;
    findByUserId(userId: string): Promise<Wallet | null>;
    create(wallet: Wallet): Promise<void>;
    findById(id: string): Promise<Wallet | null>;
    update(wallet: Wallet): Promise<void>;
    delete(id: string): Promise<void>;
    existsByUserId(userId: string): Promise<boolean>;
}
//# sourceMappingURL=WalletRepository.d.ts.map