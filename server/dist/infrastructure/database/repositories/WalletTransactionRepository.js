import { BaseRepository } from "./BaseRepository.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { walletTransactionModel, } from "../model/WalletTransactionModel.js";
import { WalletTransactionMapper } from "../../../mappers/WalletTransactionMapper.js";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import { TRANSACTION_STATUS } from "#domain/common/enums/wallet.enum.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class WalletTransactionRepository extends BaseRepository {
    _logger;
    constructor(_logger, session = null) {
        super(walletTransactionModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new WalletTransactionRepository(this._logger, session);
    }
    async create(transaction) {
        this._logger.info("Creating Transacction");
        await super.create(transaction, WalletTransactionMapper.toPersistence);
    }
    findById(id) {
        this._logger.info("Fetching Transacction by id", { id });
        return super.findById(id, WalletTransactionMapper.toDomain);
    }
    findByWalletId(walletId) {
        this._logger.info("Fetching Transacction by wallet id", { walletId });
        return super.find({ wallet_id: walletId }, {}, WalletTransactionMapper.toDomain);
    }
    findByReferenceId(referenceId) {
        this._logger.info("Fetching Transacction by reference id", { referenceId });
        return super.findOne({ reference_id: referenceId }, WalletTransactionMapper.toDomain);
    }
    async findAllWithFilters(walletId, params) {
        this._logger.info("Fetching Transacction by Filter", { params });
        const { page = 0, limit = 10, fromDate, toDate, order, type } = params;
        const filter = { wallet_id: walletId };
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
            super.find(filter, { skip, limit, sort: { created_at: order === "asc" ? 1 : -1 } }, WalletTransactionMapper.toDomain),
        ]);
        return { transactions, totalCount };
    }
    async update(transaction) {
        this._logger.info("Updating Transacction ", { transaction });
        await super.update(transaction, transaction.id, WalletTransactionMapper.toPersistence);
    }
    async findNWithWalletId(walletId, n) {
        return super.find({ wallet_id: walletId }, { limit: n, sort: { created_at: -1 } }, WalletTransactionMapper.toDomain);
    }
    async delete(id) {
        this._logger.info("Deleting Transacction by id ", { id });
        await super.delete(id);
    }
    async getRevenueAnalytics(period) {
        this._logger.info("Fetching Revenue Analytics");
        const now = new Date();
        now.setHours(23, 59, 59, 999);
        const startDate = new Date();
        let groupFormat;
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
        const result = await super.aggregate([
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
//# sourceMappingURL=WalletTransactionRepository.js.map