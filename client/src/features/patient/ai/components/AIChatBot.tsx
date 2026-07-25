"use client";

import { Loader2, MessageCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSendAIMessage } from "../hooks/useSendAIMessage";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

const AIChatBot = () => {
  const [openChatBot, setOpenChatBot] = useState(false);
  const [messages, setMessages] = useState<
    { role: "human" | "assistant"; content: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<null | string>(null);
  const { mutate: sendMessage, isPending } = useSendAIMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed || isPending) return;

    setMessages((prev) => [...prev, { role: "human", content: trimmed }]);
    setMessage("");

    sendMessage(
      { message: trimmed, conversationId },
      {
        onSuccess: (res) => {
          setConversationId(res.data.conversationId); // keep thread_id for next turn
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: res.data.message },
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Sorry, something went wrong. Please try again.",
            },
          ]);
        },
      },
    );
  };

  const auth = useAuth();
  if (auth.isLoading && !auth.user) {
    return null;
  }

  return (
    <>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-blue-600 hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={openChatBot}
        onClick={() => setOpenChatBot((prev) => !prev)}
      >
        <MessageCircle />
      </button>
      <div
        style={{
          boxShadow: " 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
          display: !openChatBot ? "none" : "flex",
        }}
        className="fixed bottom-[calc(4rem+1.5rem)] right-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[500px] flex-col"
      >
        <div className="flex flex-col space-y-1.5 pb-6 shrink-0">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by Mendable and Vercel
          </p>
        </div>

        <div className="pr-4 overflow-y-auto flex-1 min-h-0">
          {messages.map((mess, i) => (
            <div
              key={i}
              className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
            >
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <MessageCircle />
                </div>
              </span>
              <p className="leading-relaxed">
                <span className="block font-bold text-gray-700">
                  {mess.role === "human" ? "You" : "AI"}
                </span>
                {mess.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center pt-4 shrink-0">
          <form
            onSubmit={handleSend}
            className="flex items-center justify-center w-full space-x-2"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isPending}
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
            />
            <button
              type="submit"
              disabled={isPending || !message.trim()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-[#111827E6] h-10 px-4 py-2"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default AIChatBot;
