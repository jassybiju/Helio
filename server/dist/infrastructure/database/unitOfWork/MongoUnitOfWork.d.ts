import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import { type ClientSession } from "mongoose";
export declare class MongoUnitOfWork implements IUnitOfWork {
    execute<T>(work: (session: ClientSession, afterCommit: (fn: () => Promise<void>) => void) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=MongoUnitOfWork.d.ts.map