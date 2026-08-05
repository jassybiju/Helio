import { TaskType } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
// Singleton class because its a static rag and collection name wont' change
export class LangchainQdrantVectorStoreService {
    _vectorStore;
    static _instance = null;
    constructor(_vectorStore) {
        this._vectorStore = _vectorStore;
    }
    static async create() {
        if (!this._instance) {
            const embeddings = new GoogleGenerativeAIEmbeddings({
                model: "gemini-embedding-001",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
            });
            const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
                collectionName: "docs",
                url: process.env.QUANT_URL,
            });
            this._instance = new LangchainQdrantVectorStoreService(vectorStore);
        }
        return this._instance;
    }
    async addDocuments(documents) {
        return await this._vectorStore.addDocuments(documents);
    }
    async search(query) {
        const similiaritySearch = await this._vectorStore.similaritySearch(query, 2);
        return similiaritySearch;
    }
}
//# sourceMappingURL=LangchainQdrantVectorStoreService.js.map