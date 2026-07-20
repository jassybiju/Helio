import type {
  IVectorDocument,
  IVectorStoreService,
} from "@application/ports/services/IVectorStoreService.ts";
import { TaskType } from "@google/generative-ai";
import type { Document } from "@langchain/core/documents";
import { VectorStore } from "@langchain/core/vectorstores";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";

// Singleton class because its a static rag and collection name wont' change
export class LangchainQdrantVectorStoreService implements IVectorStoreService {
  private static _instance: LangchainQdrantVectorStoreService | null = null;

  private constructor(private readonly _vectorStore: QdrantVectorStore) {}

  static async create() {
    if (!this._instance) {
      const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
      });
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          collectionName: "docs",
          url: process.env.QUANT_URL!,
        }
      );

      this._instance = new LangchainQdrantVectorStoreService(vectorStore);
    }
    return this._instance;
  }

  async addDocuments(documents: Document[]) {
    return await this._vectorStore.addDocuments(documents);
  }

  async search(query: string) {
    const similiaritySearch = await this._vectorStore.similaritySearch(
      query,
      2
    );

    return similiaritySearch as IVectorDocument[];
  }
}
