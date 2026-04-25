import type { ClientSession } from "mongoose";

export interface IUnitOfWork {
  execute<T>(work: (session: ClientSession) => Promise<T>): Promise<T>;
}
