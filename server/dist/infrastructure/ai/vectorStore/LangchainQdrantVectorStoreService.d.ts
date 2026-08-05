import type { IVectorDocument, IVectorStoreService } from "#application/ports/services/IVectorStoreService.js";
import type { Document } from "@langchain/core/documents";
export declare class LangchainQdrantVectorStoreService implements IVectorStoreService {
    private readonly _vectorStore;
    private static _instance;
    private constructor();
    static create(): Promise<LangchainQdrantVectorStoreService>;
    addDocuments(documents: Document[]): Promise<void>;
    search(query: string): Promise<IVectorDocument[]>;
}
//# sourceMappingURL=LangchainQdrantVectorStoreService.d.ts.map