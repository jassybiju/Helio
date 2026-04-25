import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import mongoose, { type ClientSession } from "mongoose";

export class MongoUnitOfWork implements IUnitOfWork {
  async execute<T>(work: (session: ClientSession) => Promise<T>): Promise<T> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const result = await work(session);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
