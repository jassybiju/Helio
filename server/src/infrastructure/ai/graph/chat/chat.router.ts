import type { BookingStateType, BookingStateUpdate } from "./chat.state.js";
import { AIMessage } from "@langchain/core/messages";

export function routeAfterAgent(
  state: BookingStateType
): "toolNode" | "endTurn" {
  const lastMessage = state.messages.at(-1);

  if (!(lastMessage instanceof AIMessage)) {
    return "endTurn";
  }

  return lastMessage.tool_calls?.length ? "toolNode" : "endTurn";
}

export async function afterTools(
  _state: BookingStateType
): Promise<BookingStateUpdate> {
  return {};
}
export type AfterToolsRoute = "doctorSearchResponse" | "bookingAgent";

export function routeAfterTools(state: BookingStateType): AfterToolsRoute {
  const lastToolMessage = [...state.messages]
    .reverse()
    .find((message) => message.type === "tool");

  if (!lastToolMessage) {
    return "bookingAgent";
  }

  if (
    lastToolMessage.name === "search_doctors_by_specialty" ||
    lastToolMessage.name === "search_doctor_by_name"
  ) {
    return "doctorSearchResponse";
  }

  return "bookingAgent";
}
