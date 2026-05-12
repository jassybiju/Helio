import type {
  ITransactionFilter,
  IWalletTransactionRepository,
} from "@application/ports/repositories/IWalletTransactionRepository.ts";
import { BaseRepository } from "./BaseRepository.ts";
import { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import {
  walletTransactionModel,
  type WalletTransactionDoc,
} from "../model/WalletTransactionModel.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ClientSession, QueryFilter } from "mongoose";
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

  async findAllWithFilters(
    walletId: string,

    params: ITransactionFilter
  ): Promise<{ transactions: WalletTransaction[]; totalCount: number }> {
    this._logger.info("Fetching Transacction by Filter", { params });

    const { page = 0, limit = 10, fromDate, toDate, order, type } = params;

    const filter: QueryFilter<WalletTransactionDoc> = { wallet_id: walletId };

    if (fromDate || toDate) {
      filter.created_at = {};

      if (fromDate)
        filter.created_at.$gte = new Date(fromDate).setHours(0, 0, 0, 0);
      if (toDate)
        filter.created_at.$gte = new Date(toDate).setHours(23, 59, 59, 999);
    }

    if (type) {
      filter.type = type;
    }

    const skip = (page - 1) * limit;

    const [totalCount, transactions] = await Promise.all([
      super.count(filter),
      super.find(
        filter,
        { skip, limit, sort: { created_at: order === "asc" ? 1 : -1 } },
        WalletTransactionMapper.toDomain
      ),
    ]);
    return { transactions, totalCount };
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
