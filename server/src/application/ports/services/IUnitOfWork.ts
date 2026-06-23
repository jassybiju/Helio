import type { ClientSession } from "mongoose";

export interface IUnitOfWork {
  execute<T>(work: (session: ClientSession, afterCommit? : (fn : ()=>Promise<void>)=>void) => Promise<T>): Promise<T>;
}
