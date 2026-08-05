import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { ClientSession, Model, PipelineStage, QueryFilter } from "mongoose";
/**
 * Base Mongo DB Repository providing generic data access methods.
 *
 * This class abstracts common database operations.
 *
 * @template TDomain - The Domain Entity type
 * @template TModel - The databse document type
 */
export declare abstract class BaseRepository<TDomain, TModel extends Record<string, unknown>> {
    private readonly _model;
    private readonly _session;
    constructor(_model: Model<TModel>, _session?: ClientSession | null);
    protected findOne(query: QueryFilter<TModel>, map: (doc: TModel) => TDomain, options?: {
        sort?: Record<string, 1 | -1>;
    }): Promise<TDomain | null>;
    protected findById(id: string, map: (doc: TModel) => TDomain): Promise<TDomain | null>;
    protected create(entity: TDomain, persistance: (entity: TDomain) => Record<string, unknown>): Promise<void>;
    protected update(entity: TDomain, id: string, persistence: (entity: TDomain) => Record<string, unknown>): Promise<void>;
    protected find(filter: QueryFilter<TModel>, options: {
        skip?: number;
        limit?: number;
        sort?: Record<string, 1 | -1>;
    }, map: (doc: TModel) => TDomain): Promise<TDomain[]>;
    protected delete(id: string): Promise<void>;
    protected insertMany(entities: TDomain[], persistance: (entity: TDomain) => Record<string, unknown>): Promise<void>;
    protected aggregate<T>(pipeline: PipelineStage[]): Promise<T[]>;
    protected count(filter: QueryFilter<TModel>): Promise<number>;
    protected getRegistrationAnalytics(period: BOOKING_PERIOD, dateField?: string): Promise<{
        labels: string[];
        count: number[];
    }>;
    private getISOWeek;
}
//# sourceMappingURL=BaseRepository.d.ts.map