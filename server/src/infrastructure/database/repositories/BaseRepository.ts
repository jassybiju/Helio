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
    console.log(persistence(entity), id);
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
}
