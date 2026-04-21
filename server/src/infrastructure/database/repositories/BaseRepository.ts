import type { Model, QueryFilter } from "mongoose";

/**
 * Base Mongo DB Repository providing generic data access methods.
 *
 * This class abstracts common database operations.
 *
 * @template TDomain - The Domain Entity type
 * @template TModel - The databse document type
 */
export abstract class BaseRepository<TDomain, TModel> {
  constructor(private readonly _model: Model<TModel>) {}

  protected async findOne(
    query: object,
    map: (doc: TModel) => TDomain
  ): Promise<TDomain | null> {
    const doc = await this._model.findOne({ ...query, is_deleted: false });
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
    persistance: (entity: TDomain) => object
  ): Promise<void> {
    await this._model.create(persistance(entity));
  }

  protected async update(
    entity: TDomain,
    id: string,
    persistence: (entity: TDomain) => object
  ): Promise<void> {
    const result = await this._model.updateOne(
      { _id: id, is_deleted: false },
      persistence(entity)
    );
  }

  protected async find(
    filter: QueryFilter<TModel>,
    options: { skip?: number; limit?: number; sort?: Record<string, 1 | -1> },
    map: (doc: TModel) => TDomain
  ): Promise<TDomain[]> {
    const { skip = 0, limit = 10, sort = {} } = options;
    const docs = await this._model
      .find({ ...filter, is_deleted: false })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    return docs.map((x) => map(x));
  }

  protected async delete(id: string): Promise<void> {
    await this._model.updateOne(
      { _id: id, is_deleted: { $ne: true } },
      { is_deleted: true }
    );
  }

  protected async count(filter: QueryFilter<TModel>): Promise<number> {
    return await this._model.countDocuments(filter);
  }
}
