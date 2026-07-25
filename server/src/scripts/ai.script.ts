import { LangchainQdrantVectorStoreService } from "@infrastructure/ai/vectorStore/LangchainQdrantVectorStoreService.ts";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from "path";
const vectorStore = await LangchainQdrantVectorStoreService.create();

const filePath = path.join(process.cwd(), "src", "data", "knowledgebase.txt");
// Loading TextLoader
const loader = new TextLoader(filePath);
const docs = await loader.load();

// chunking
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});
const chunks = await splitter.splitDocuments(docs);

// embedding
await vectorStore.addDocuments(chunks);
