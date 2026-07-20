import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import mongoose, { type ClientSession } from "mongoose";

export class MongoUnitOfWork implements IUnitOfWork {
  async execute<T>(
    work: (
      session: ClientSession,
      afterCommit: (fn: () => Promise<void>) => void
    ) => Promise<T>
  ): Promise<T> {
    const session = await mongoose.startSession();

    // Save all the function to an arry
    const postCommitActions: (() => Promise<void>)[] = [];

    try {
      session.startTransaction();

      // call work with session and cb for pushing post commit actions to array
      const result = await work(session, (fn) => postCommitActions.push(fn));

      await session.commitTransaction();

      // running that function and awaiting the promise
      await Promise.all(postCommitActions.map((fn) => fn()));
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
