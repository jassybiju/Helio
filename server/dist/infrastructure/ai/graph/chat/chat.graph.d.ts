import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AIMessage, type BaseMessage } from "@langchain/core/messages";
import { type DynamicStructuredTool, type DynamicTool } from "@langchain/core/tools";
import { type BaseCheckpointSaver } from "@langchain/langgraph";
type Tool = DynamicStructuredTool | DynamicTool;
export interface CreateChatGraphOptions {
    model: BaseChatModel;
    checkpointer: BaseCheckpointSaver;
    tools: {
        retrieve: Tool;
        getSpecialties: Tool;
        getDoctors: Tool;
        getDoctorSlots: Tool;
        walletBalance: Tool;
        bookAppointment: Tool;
    };
}
export declare function createChatGraph({ model, checkpointer, tools, }: CreateChatGraphOptions): import("@langchain/langgraph").CompiledStateGraph<{
    messages: BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[];
    patientId: string;
    route: "wallet" | "rag" | "findDoctor" | "chat";
}, {
    messages?: BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[] | import("@langchain/langgraph").OverwriteValue<BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[]>;
    patientId?: string;
    route?: "wallet" | "rag" | "findDoctor" | "chat";
}, "router" | "wallet" | "rag" | "findDoctor" | "__start__", {
    messages: import("@langchain/langgraph").BaseChannel<BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[], BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[] | import("@langchain/langgraph").OverwriteValue<BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[]>, unknown>;
    patientId: import("@langchain/langgraph").LastValue<string>;
    route: import("@langchain/langgraph").LastValue<"wallet" | "rag" | "findDoctor" | "chat">;
}, {
    messages: import("@langchain/langgraph").BaseChannel<BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[], BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[] | import("@langchain/langgraph").OverwriteValue<BaseMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>, import("@langchain/core/messages").MessageType>[]>, unknown>;
    patientId: import("@langchain/langgraph").LastValue<string>;
    route: import("@langchain/langgraph").LastValue<"wallet" | "rag" | "findDoctor" | "chat">;
}, import("@langchain/langgraph").StateDefinition, {
    router: {
        route: "chat";
        messages: AIMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>>[];
    } | {
        route: "wallet" | "rag" | "findDoctor";
        messages?: never;
    };
    rag: {
        messages: import("@langchain/core/messages").AIMessageChunk<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>>[];
    };
    findDoctor: {
        messages: AIMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>>[];
    };
    wallet: {
        messages: import("@langchain/core/messages").AIMessageChunk<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>>[];
    };
}, unknown, unknown, []>;
export {};
//# sourceMappingURL=chat.graph.d.ts.map