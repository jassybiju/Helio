import {
  AIMessage,
  BaseMessage,
  type MessageStructure,
  type MessageToolSet,
  type MessageType,
} from "@langchain/core/messages";
import {
  END,
  ReducedValue,
  StateSchema,
  type Messages,
} from "@langchain/langgraph";

export function chatRouter(state: StateSchema) {
  const lastMessage = state.messages.at(-1);

  if (lastMessage instanceof AIMessage && lastMessage.tool_calls?.length) {
    return "toolCall";
  }

  return END;
}
