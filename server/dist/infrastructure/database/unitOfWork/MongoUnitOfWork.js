import mongoose, {} from "mongoose";
export class MongoUnitOfWork {
    async execute(work) {
        const session = await mongoose.startSession();
        // Save all the function to an arry
        const postCommitActions = [];
        try {
            session.startTransaction();
            // call work with session and cb for pushing post commit actions to array
            const result = await work(session, (fn) => postCommitActions.push(fn));
            await session.commitTransaction();
            // running that function and awaiting the promise
            await Promise.all(postCommitActions.map((fn) => fn()));
            return result;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
}
//# sourceMappingURL=MongoUnitOfWork.js.map