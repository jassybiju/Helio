import { AIMessage, SystemMessage, } from "@langchain/core/messages";
import {} from "@langchain/core/tools";
import { Annotation, END, messagesStateReducer, START, StateGraph, } from "@langchain/langgraph";
import z from "zod";
const ChatState = Annotation.Root({
    messages: Annotation({
        reducer: messagesStateReducer,
        default: () => [],
    }),
    patientId: Annotation(),
    route: Annotation(),
});
export function createChatGraph({ model, checkpointer, tools, }) {
    const graph = new StateGraph(ChatState)
        .addNode("router", createRouterNode({ model }))
        .addNode("rag", createRAGNode({ model, retrieveTool: tools.retrieve }))
        .addNode("findDoctor", createFindDoctorNode({ model, tools }))
        .addNode("wallet", createWalletNode({ model, walletTool: tools.walletBalance }))
        .addEdge(START, "router")
        .addConditionalEdges("router", (state) => {
        console.log("🐛 [Router Condition] Directing to:", state.route);
        debugger;
        return state.route;
    }, {
        rag: "rag",
        findDoctor: "findDoctor",
        wallet: "wallet",
        chat: END,
    })
        .addEdge("rag", END)
        .addEdge("wallet", END)
        .addEdge("findDoctor", END);
    return graph.compile({ checkpointer });
}
// Node 1: Fast Router
function createRouterNode({ model }) {
    const routerModel = model.withStructuredOutput(z.object({
        route: z.enum(["rag", "findDoctor", "chat", "wallet"]),
    }));
    return async (state) => {
        console.log("🐛 [Node: router] Entering with message count:", state.messages.length);
        debugger;
        const result = await routerModel.invoke([
            new SystemMessage(`Classify the patient's intent:
- "findDoctor": Patient mentions symptoms, asks for a doctor, has a medical problem or specifies a medical specialty.
- "wallet": Patient asks about their wallet balance, credits, or remaining funds.
- "rag": Patient asks general platform questions (pricing, operating hours, policies, platform rules).
- "chat": Simple greetings ("hi", "hello") or off-topic chat.`),
            ...state.messages,
        ]);
        console.log("🐛 [Node: router] Classified as:", result.route);
        debugger;
        if (result.route === "chat") {
            return {
                route: "chat",
                messages: [
                    new AIMessage("Hello! How can I assist you with your health or finding a doctor today?"),
                ],
            };
        }
        return { route: result.route };
    };
}
// Node 2: General Platform Knowledge (RAG)
function createRAGNode({ model, retrieveTool, }) {
    return async (state) => {
        console.log("🐛 [Node: rag] Entering");
        debugger;
        const lastMsg = String(state.messages.at(-1)?.content ?? "");
        const docs = await retrieveTool.invoke({ query: lastMsg });
        console.log("🐛 [Node: rag] Retrieved docs:", docs);
        debugger;
        const response = await model.invoke([
            new SystemMessage(`Answer the patient using only this platform information:\n\n${JSON.stringify(docs)}
        
IMPORTANT:
Respond using the minimum possible tokens while remaining correct.
Be concise.
Do not add unnecessary context, introductions, conclusions, or explanations.`),
            ...state.messages,
        ]);
        return { messages: [response] };
    };
}
// Node 3: Direct Doctor Identification (Symptom -> Verify Specialty -> Search Doctor)
// Node 3: Direct Doctor Identification (Symptom/Typo -> Verify via Tool Response -> Search Doctor)
function createFindDoctorNode({ model, tools, }) {
    const matchSpecialtyModel = model.withStructuredOutput(z.object({
        matchedSpecialty: z
            .string()
            .nullable()
            .describe("The exact specialty string from the available list that matches the user's intent or typo. Return null if no match exists."),
        isMatchFound: z
            .boolean()
            .describe("True if a matching specialty exists on the platform"),
    }));
    return async (state) => {
        console.log("🐛 [Node: findDoctor] Entering");
        debugger;
        // Step 1: Call getSpecialties tool to retrieve current platform specialties
        const platformSpecialties = await tools.getSpecialties.invoke({});
        console.log("🐛 [Node: findDoctor] Platform Specialties retrieved:", platformSpecialties);
        debugger;
        // Step 2: Pass user input AND platform specialties list to LLM to handle typos & fuzzy matching
        const matchResult = await matchSpecialtyModel.invoke([
            new SystemMessage(`You are a medical specialty matcher.
Given the patient's message and the list of available specialties on our platform, identify if any platform specialty matches their needs or symptoms.

CRITICAL INSTRUCTION:
- Handle typos, misspellings, or loose symptom descriptions (e.g., "cardology" -> "Cardiology", "skin problem" -> "Dermatology").
- Pick the EXACT specialty string name from the provided platform list if a match is found.
- If no available specialty matches the symptoms or request, set isMatchFound to false.

IMPORTANT:
- Respond using the minimum possible tokens while remaining correct.
- Be concise.
- Do not add unnecessary context, introductions, conclusions, or explanations.

Available Platform Specialties:
${JSON.stringify(platformSpecialties)}`),
            ...state.messages,
        ]);
        console.log("🐛 [Node: findDoctor] LLM Specialty Match Result:", matchResult);
        debugger;
        // Step 3: Handle unmatched specialty
        if (!matchResult.isMatchFound || !matchResult.matchedSpecialty) {
            console.log("🐛 [Node: findDoctor] No matching specialty on platform");
            return {
                messages: [
                    new AIMessage("I couldn't find an available specialty on our platform that matches your query. Could you please specify your symptoms or the specialty you're looking for?"),
                ],
            };
        }
        // Step 4: Search doctors using the mapped, verified specialty
        const doctorResults = await tools.getDoctors.invoke({
            query: matchResult.matchedSpecialty,
        });
        console.log("🐛 [Node: findDoctor] Doctor Search Results for:", matchResult.matchedSpecialty, doctorResults);
        debugger;
        // Step 5: Present found doctors to patient
        const response = await model.invoke([
            new SystemMessage(`You are a helpful healthcare assistant.
Present the available doctors found for the specialty "${matchResult.matchedSpecialty}" clearly with their experience, ratings, and fees.
Doctor Data: ${JSON.stringify(doctorResults)}

IMPORTANT:
Respond using the minimum possible tokens while remaining correct.
Be concise.
Do not add unnecessary context, introductions, conclusions, or explanations.

`),
            ...state.messages,
        ]);
        console.log("🐛 [Node: findDoctor] Final response generated");
        debugger;
        return { messages: [response] };
    };
}
function createWalletNode({ model, walletTool, }) {
    return async (state) => {
        console.log("🐛 [Node: wallet] Entering");
        debugger;
        // Call wallet tool with patient ID if required by the tool payload schema
        const walletData = await walletTool.invoke({ patientId: state.patientId });
        console.log("🐛 [Node: wallet] Balance retrieved:", walletData);
        debugger;
        const response = await model.invoke([
            new SystemMessage(`You are a helpful assistant. Present the patient's wallet balance clearly and politely.
Wallet Data: ${JSON.stringify(walletData)}`),
            ...state.messages,
        ]);
        return { messages: [response] };
    };
}
//# sourceMappingURL=chat.graph.js.map