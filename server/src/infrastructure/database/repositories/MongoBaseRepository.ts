import type { ILogger } from "@application/ports/services/ILogger.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { Model } from "mongoose";

/**
 * Base Mongo DB Repository providing generic data access methods.
 *
 * This class abstracts common database operations.
 *
 * @template TDomain - The Domain Entity type
 * @template TModel - The databse document type
 */
export abstract class MongoBaseRepository<TDomain, TModel> {
  constructor(private readonly _model: Model<TModel>) {}

  protected async findOne(
    query: object,
    map: (doc: TModel) => TDomain
  ): Promise<TDomain | null> {
    const doc = await this._model.findOne(query);

    if (!doc) return null;

    return map(doc);
  }

  protected async findById(
    id: string,
    map: (doc: TModel) => TDomain
  ): Promise<TDomain | null> {
    return await this.findOne({ _id: id }, map);
  }

  protected async save(
    entity: TDomain,
    id: string,
    persistance: (entity: TDomain) => object
  ): Promise<void> {
    await this._model.findOneAndUpdate({ _id: id }, persistance(entity), {
      new: true,
      upsert: true,
    });
  }
}
