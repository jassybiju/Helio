import type { IWalletTransactionRepository } from "@application/ports/repositories/IWalletTransactionRepository.ts";
import { BaseRepository } from "./BaseRepository.ts";
import { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import {
  walletTransactionModel,
  type WalletTransactionDoc,
} from "../model/WalletTransactionModel.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ClientSession } from "mongoose";
import { WalletTransactionMapper } from "../../../mappers/WalletTransactionMapper.ts";

export class WalletTransactionRepository
  extends BaseRepository<WalletTransaction, WalletTransactionDoc>
  implements IWalletTransactionRepository
{
  constructor(
    private readonly _logger: ILogger,
    session: ClientSession | null = null
  ) {
    super(walletTransactionModel, session);
  }
  withSession(session: ClientSession): IWalletTransactionRepository {
    return new WalletTransactionRepository(this._logger, session);
  }

  async create(transaction: WalletTransaction): Promise<void> {
    this._logger.info("Creating Transacction");
    await super.create(transaction, WalletTransactionMapper.toPersistence);
  }

  findById(id: string): Promise<WalletTransaction | null> {
    this._logger.info("Fetching Transacction by id", { id });
    return super.findById(id, WalletTransactionMapper.toDomain);
  }

  findByWalletId(walletId: string): Promise<WalletTransaction[]> {
    this._logger.info("Fetching Transacction by wallet id", { walletId });
    return super.find(
      { wallet_id: walletId },
      {},
      WalletTransactionMapper.toDomain
    );
  }

  findByReferenceId(referenceId: string): Promise<WalletTransaction | null> {
    this._logger.info("Fetching Transacction by reference id", { referenceId });
    return super.findOne(
      { reference_id: referenceId },
      WalletTransactionMapper.toDomain
    );
  }

  async update(transaction: WalletTransaction): Promise<void> {
    this._logger.info("Updating Transacction ", { transaction });
    await super.update(
      transaction,
      transaction.id,
      WalletTransactionMapper.toPersistence
    );
  }

  async delete(id: string): Promise<void> {
    this._logger.info("Deleting Transacction by id ", { id });
    await super.delete(id);
  }
}
