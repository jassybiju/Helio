import { StateGraph, START, END, MemorySaver } from "@langchain/langgraph";

import { ToolNode } from "@langchain/langgraph/prebuilt";

import {
  BookingState,
  type BookingStateType,
  type BookingStateUpdate,
  type DoctorOption,
} from "./chat.state.js";

import { bookingAgent, routeAfterAgent } from "./chat.agent.js";

import { bookingAgentTools } from "./chat.tools.js";

import { afterTools, routeAfterTools } from "./chat.router.js";
import { AIMessage } from "@langchain/core/messages";

export async function doctorSearchResponse(
  state: BookingStateType
): Promise<BookingStateUpdate> {
  const lastToolMessage = [...state.messages]
    .reverse()
    .find((message) => message.type === "tool");

  if (!lastToolMessage) {
    return {};
  }

  const doctors = JSON.parse(String(lastToolMessage.content)) as DoctorOption[];

  if (doctors.length === 0) {
    return {
      messages: [
        new AIMessage("I couldn't find any doctors matching that request."),
      ],
    };
  }

  if (doctors.length === 1) {
    return {
      messages: [
        new AIMessage(
          `I found Dr. ${doctors[0]!.name}, ` +
            `a ${doctors[0]!.specialty} specialist.\n\n` +
            "Would you like to book an appointment with this doctor?"
        ),
      ],
    };
  }

  const doctorList = doctors
    .map(
      (doctor, index) =>
        `${index + 1}. Dr. ${doctor.name} — ${doctor.specialty}`
    )
    .join("\n");

  return {
    messages: [
      new AIMessage(
        `I found these doctors:\n\n${doctorList}\n\n` +
          "Which doctor would you like to book with?"
      ),
    ],
  };
}

const graph = new StateGraph(BookingState)

  .addNode("bookingAgent", bookingAgent)

  .addNode("toolNode", new ToolNode(bookingAgentTools))

  .addConditionalEdges(START, () => "bookingAgent", {
    bookingAgent: "bookingAgent",
  })

  .addConditionalEdges("bookingAgent", routeAfterAgent, {
    toolNode: "toolNode",
    endTurn: END,
  })

  .addEdge("toolNode", "bookingAgent");

export const checkpointer = new MemorySaver();

export const bookingApp = graph.compile({
  checkpointer,
});
