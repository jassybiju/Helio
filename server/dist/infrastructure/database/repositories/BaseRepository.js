import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
/**
 * Base Mongo DB Repository providing generic data access methods.
 *
 * This class abstracts common database operations.
 *
 * @template TDomain - The Domain Entity type
 * @template TModel - The databse document type
 */
export class BaseRepository {
    _model;
    _session;
    constructor(_model, _session = null) {
        this._model = _model;
        this._session = _session;
    }
    async findOne(query, map, options) {
        const doc = await this._model
            .findOne({ ...query, is_deleted: false })
            .sort(options?.sort ?? {})
            .session(this._session);
        if (!doc)
            return null;
        return map(doc);
    }
    async findById(id, map) {
        return await this.findOne({ _id: id }, map);
    }
    async create(entity, persistance) {
        const doc = new this._model(persistance(entity));
        await doc.save({ session: this._session });
    }
    async update(entity, id, persistence) {
        await this._model
            .updateOne({ _id: id, is_deleted: false }, persistence(entity))
            .session(this._session);
    }
    async find(filter, options, map) {
        console.log(options, filter);
        const { skip = 0, limit, sort = {} } = options;
        const docs = await this._model
            .find({ ...filter, is_deleted: false })
            .sort(sort)
            .skip(skip)
            .limit(limit ?? 0)
            .lean()
            .session(this._session);
        return docs.map((x) => map(x));
    }
    async delete(id) {
        await this._model
            .updateOne({ _id: id, is_deleted: { $ne: true } }, { is_deleted: true })
            .session(this._session);
    }
    async insertMany(entities, persistance) {
        await this._model.insertMany(entities.map((entity) => persistance(entity)), { session: this._session });
    }
    async aggregate(pipeline) {
        return await this._model.aggregate(pipeline).session(this._session);
    }
    async count(filter) {
        return await this._model.countDocuments(filter).session(this._session);
    }
    async getRegistrationAnalytics(period, dateField = "createdAt") {
        const now = new Date();
        let startDate;
        let labels;
        let groupId;
        switch (period) {
            case BOOKING_PERIOD.WEEK: {
                startDate = new Date(now);
                startDate.setHours(0, 0, 0, 0);
                startDate.setDate(now.getDate() - 6);
                labels = Array.from({ length: 7 }, (_, i) => {
                    const d = new Date(startDate);
                    d.setDate(startDate.getDate() + i);
                    return d.toLocaleDateString("en-US", {
                        weekday: "short",
                    });
                });
                groupId = {
                    year: { $year: `$${dateField}` },
                    month: { $month: `$${dateField}` },
                    day: { $dayOfMonth: `$${dateField}` },
                };
                break;
            }
            case BOOKING_PERIOD.MONTH: {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
                groupId = {
                    day: {
                        $dayOfMonth: `$${dateField}`,
                    },
                };
                break;
            }
            case BOOKING_PERIOD.YEAR: {
                startDate = new Date(now.getFullYear(), 0, 1);
                labels = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                groupId = {
                    month: {
                        $month: `$${dateField}`,
                    },
                };
                break;
            }
        }
        const data = await this.aggregate([
            {
                $match: {
                    is_deleted: false,
                    [dateField]: {
                        $gte: startDate,
                        $lte: now,
                    },
                },
            },
            {
                $group: {
                    _id: groupId,
                    total: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1,
                },
            },
        ]);
        const count = new Array(labels.length).fill(0);
        for (const row of data) {
            let index = -1;
            switch (period) {
                case BOOKING_PERIOD.WEEK: {
                    const d = new Date(row._id.year, row._id.month - 1, row._id.day);
                    index = Math.floor((d.getTime() - startDate.getTime()) / 86400000);
                    break;
                }
                case BOOKING_PERIOD.MONTH: {
                    index = row._id.day - 1;
                    break;
                }
                case BOOKING_PERIOD.YEAR: {
                    index = row._id.month - 1;
                    break;
                }
            }
            if (index >= 0 && index < count.length) {
                count[index] = row.total;
            }
        }
        return {
            labels,
            count,
        };
    }
    getISOWeek(date) {
        const tmp = new Date(date);
        tmp.setHours(0, 0, 0, 0);
        tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
        const yearStart = new Date(tmp.getFullYear(), 0, 1);
        return Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }
}
//# sourceMappingURL=BaseRepository.js.map