import type {
  ITransactionFilter,
  IWalletTransactionRepository,
} from "#application/ports/repositories/IWalletTransactionRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import {
  walletTransactionModel,
  type WalletTransactionDoc,
} from "../model/WalletTransactionModel.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession, QueryFilter } from "mongoose";
import { WalletTransactionMapper } from "../../../mappers/WalletTransactionMapper.js";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import { TRANSACTION_STATUS } from "#domain/common/enums/wallet.enum.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

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

  async findNWithWalletId(
    walletId: string,
    n: number
  ): Promise<WalletTransaction[]> {
    return super.find(
      { wallet_id: walletId },
      { limit: n, sort: { created_at: -1 } },
      WalletTransactionMapper.toDomain
    );
  }

  async delete(id: string): Promise<void> {
    this._logger.info("Deleting Transacction by id ", { id });
    await super.delete(id);
  }

  async getRevenueAnalytics(period: BOOKING_PERIOD): Promise<{
    labels: string[];
    platformRevenue: number[];
  }> {
    this._logger.info("Fetching Revenue Analytics");

    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const startDate = new Date();
    let groupFormat: string;

    switch (period) {
      case BOOKING_PERIOD.WEEK:
        startDate.setDate(now.getDate() - 6);
        groupFormat = "%Y-%m-%d";
        break;

      case BOOKING_PERIOD.MONTH:
        startDate.setDate(now.getDate() - 29);
        groupFormat = "%Y-%m-%d";
        break;

      case BOOKING_PERIOD.YEAR:
        startDate.setMonth(now.getMonth() - 11);
        startDate.setDate(1);
        groupFormat = "%Y-%m";
        break;

      default:
        throw new Error("Invalid period");
    }

    const result = await super.aggregate<{
      _id: { label: string };
      platformRevenue: number;
    }>([
      {
        $match: {
          status: TRANSACTION_STATUS.COMPLETED,
          created_at: {
            $gte: startDate,
            $lte: now,
          },
        },
      },
      {
        $lookup: {
          from: "walletmodels",
          localField: "wallet_id",
          foreignField: "_id",
          as: "wallet",
        },
      },
      {
        $unwind: "$wallet",
      },
      {
        $group: {
          _id: {
            label: {
              $dateToString: {
                format: groupFormat,
                date: "$created_at",
              },
            },
          },

          platformRevenue: {
            $sum: {
              $cond: [
                { $eq: ["$wallet.user_role", USER_ROLES.ADMIN] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.label": 1,
        },
      },
    ]);
    return {
      labels: result.map((r) => r._id.label),
      platformRevenue: result.map((r) => r.platformRevenue),
    };
  }
}
