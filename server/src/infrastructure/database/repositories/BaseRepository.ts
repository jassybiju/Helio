import { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";
import type {
  ClientSession,
  Model,
  PipelineStage,
  QueryFilter,
} from "mongoose";

/**
 * Base Mongo DB Repository providing generic data access methods.
 *
 * This class abstracts common database operations.
 *
 * @template TDomain - The Domain Entity type
 * @template TModel - The databse document type
 */
export abstract class BaseRepository<
  TDomain,
  TModel extends Record<string, unknown>,
> {
  constructor(
    private readonly _model: Model<TModel>,
    private readonly _session: ClientSession | null = null
  ) {}

  protected async findOne(
    query: QueryFilter<TModel>,
    map: (doc: TModel) => TDomain,
    options?: {
      sort?: Record<string, 1 | -1>;
    }
  ): Promise<TDomain | null> {
    const doc = await this._model
      .findOne({ ...query, is_deleted: false })
      .sort(options?.sort ?? {})
      .session(this._session);
    if (!doc) return null;

    return map(doc);
  }

  protected async findById(
    id: string,
    map: (doc: TModel) => TDomain
  ): Promise<TDomain | null> {
    return await this.findOne({ _id: id }, map);
  }

  protected async create(
    entity: TDomain,
    persistance: (entity: TDomain) => Record<string, unknown>
  ): Promise<void> {
    const doc = new this._model(persistance(entity));
    await doc.save({ session: this._session });
  }

  protected async update(
    entity: TDomain,
    id: string,
    persistence: (entity: TDomain) => Record<string, unknown>
  ): Promise<void> {
    await this._model
      .updateOne({ _id: id, is_deleted: false }, persistence(entity))
      .session(this._session);
  }

  protected async find(
    filter: QueryFilter<TModel>,
    options: { skip?: number; limit?: number; sort?: Record<string, 1 | -1> },
    map: (doc: TModel) => TDomain
  ): Promise<TDomain[]> {
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

  protected async delete(id: string): Promise<void> {
    await this._model
      .updateOne({ _id: id, is_deleted: { $ne: true } }, { is_deleted: true })
      .session(this._session);
  }

  protected async insertMany(
    entities: TDomain[],
    persistance: (entity: TDomain) => Record<string, unknown>
  ): Promise<void> {
    await this._model.insertMany(
      entities.map((entity) => persistance(entity)),
      { session: this._session }
    );
  }

  protected async aggregate<T>(pipeline: PipelineStage[]): Promise<T[]> {
    return await this._model.aggregate(pipeline).session(this._session);
  }

  protected async count(filter: QueryFilter<TModel>): Promise<number> {
    return await this._model.countDocuments(filter).session(this._session);
  }
  protected async getRegistrationAnalytics(
    period: BOOKING_PERIOD,
    dateField = "createdAt"
  ): Promise<{ labels: string[]; count: number[] }> {
    const now = new Date();

    let startDate: Date;
    let labels: string[];
    let groupId: Record<string, unknown>;

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

        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();

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

    const data = await this.aggregate<{
      _id: { year: number; month: number; day: number };
      total: number;
    }>([
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

  private getISOWeek(date: Date): number {
    const tmp = new Date(date);

    tmp.setHours(0, 0, 0, 0);

    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));

    const yearStart = new Date(tmp.getFullYear(), 0, 1);

    return Math.ceil(
      ((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
  }
}
