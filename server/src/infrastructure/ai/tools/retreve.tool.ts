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
      } catch {
        return ["Error retrieving docs", []];
      }
    },
    {
      name: "retrieve",
      description: `
Retrieve information ONLY about the Helio platform.

Use this tool for:
- Helio features
- How Helio works
- Account related questions
- Privacy policies
- Consultation process
- Medical record management
- Platform FAQs

DO NOT use this tool for:
- Patient symptoms
- Medical conditions
- Disease information
- Diagnosis
- Treatment advice
- Selecting doctor specialties
- Finding doctors
- Appointment availability

If a patient describes symptoms or a health problem:
DO NOT retrieve information.
Use the symptom-based doctor discovery workflow instead.
      `,
      schema: z.object({ query: z.string() }),
      responseFormat: "content_and_artifact",
    }
  );
}
