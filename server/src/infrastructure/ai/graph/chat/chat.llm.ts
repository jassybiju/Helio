import { logger } from "#shared/utils/logger.utils.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
});

export async function saftStructuredCall<T>(
  fn: () => Promise<T>,
  context: string
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (err) {
    logger.error(`[llm]: structured call failed in ${context}`, err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknonw LLM Error",
    };
  }
}
