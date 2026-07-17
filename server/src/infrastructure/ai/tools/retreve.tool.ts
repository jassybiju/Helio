import type { IVectorStoreService } from "@application/ports/services/IVectorStoreService.ts";
import { tool } from "@langchain/core/tools";
import z from "zod";

export function createRetrieveTool(vectorStore: IVectorStoreService) {
  return tool(
    async ({ query }) => {
      try {
        const retreivedDocs = await vectorStore.search(query);
        const serialized = retreivedDocs
          .map(
            (doc) =>
              `Source: ${doc?.metadata?.source}\nContent: ${doc.pageContent}`
          )
          .join("\n");
        return [serialized || "No Releavant Information Found.", retreivedDocs];
      } catch (error) {
        return ["Error retrieving docs", []];
      }
    },
    {
      name: "retrieve",
      description: "Retrieve information related to a query",
      schema: z.object({ query: z.string() }),
      responseFormat: "content_and_artifact",
    }
  );
}
