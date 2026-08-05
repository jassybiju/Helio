import type { IVectorStoreService } from "#application/ports/services/IVectorStoreService.js";
import z from "zod";
export declare function createRetrieveTool(vectorStore: IVectorStoreService): import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    query: z.ZodString;
}, z.z.core.$strip>, {
    query: string;
}, {
    query: string;
}, (string | import("#application/ports/services/IVectorStoreService.js").IVectorDocument[])[], unknown, "retrieve">;
//# sourceMappingURL=retreve.tool.d.ts.map