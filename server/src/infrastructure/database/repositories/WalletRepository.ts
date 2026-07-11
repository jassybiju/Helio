import type { Wallet } from "@domain/entities/Wallet.ts";
import { BaseRepository } from "./BaseRepository.ts";
import { walletModel, type WalletDoc } from "../model/WalletModel.ts";
import type { IWalletRepository } from "@application/ports/repositories/IWalletRepository.ts";
import type { ClientSession } from "mongoose";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { WalletMapper } from "../../../mappers/WalletMapper.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export class WalletRepository
  extends BaseRepository<Wallet, WalletDoc>
  implements IWalletRepository
{
  constructor(
    private readonly _logger: ILogger,
    session: ClientSession | null = null
  ) {
    super(walletModel, session);
  }

  withSession(session: ClientSession): IWalletRepository {
    return new WalletRepository(this._logger, session);
  }

  findAdminWallet(): Promise<Wallet | null> {
    return super.findOne({user_role : USER_ROLES.ADMIN}, WalletMapper.toDomain)
  }

  findByUserId(userId: string): Promise<Wallet | null> {
    this._logger.info("Fetching Wallet By User ID", { userId });
    return super.findOne({ user_id: userId }, WalletMapper.toDomain);
  }

  async create(wallet: Wallet): Promise<void> {
    this._logger.info("Creating Wallet", { wallet });
    await super.create(wallet, WalletMapper.toPersistence);
  }

  findById(id: string): Promise<Wallet | null> {
    this._logger.info("Fetching Wallet By  ID", { id });
    return super.findById(id, WalletMapper.toDomain);
  }

  async update(wallet: Wallet): Promise<void> {
    this._logger.info("Updating Wallet By ID", { wallet });
    await super.update(wallet, wallet.id, WalletMapper.toPersistence);
  }

  async delete(id: string): Promise<void> {
    this._logger.info("Deleting Wallet By ID", { id });
    await super.delete(id);
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const doc = await super.findOne({ user_id: userId }, WalletMapper.toDomain);
    if (!doc) return false;
    return true;
  }
}
