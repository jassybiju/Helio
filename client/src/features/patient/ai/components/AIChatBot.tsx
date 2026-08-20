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
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { mutate: sendMessage, isPending } = useSendAIMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = message.trim();

    if (!trimmed || isPending) return;

    setMessages((prev) => [
      ...prev,
      { role: "human", content: trimmed },
    ]);

    setMessage("");

    sendMessage(
      { message: trimmed, conversationId },
      {
        onSuccess: (res) => {
          setConversationId(res.data.conversationId);

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: res.data.message,
            },
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, something went wrong. Please try again.",
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
      {/* Chat toggle button */}
      <button
        type="button"
        aria-label={openChatBot ? "Close chatbot" : "Open chatbot"}
        aria-haspopup="dialog"
        aria-expanded={openChatBot}
        onClick={() => setOpenChatBot((prev) => !prev)}
        className="
          fixed
          bottom-4
          right-4
          z-50
          flex
          h-12
          w-12
          sm:h-14
          sm:w-14
          items-center
          justify-center
          rounded-full
          bg-blue-600
          text-white
          shadow-lg
          transition-colors
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
        "
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Chat window */}
      {openChatBot && (
        <div
          role="dialog"
          aria-label="AI Chatbot"
          className="
            fixed
            bottom-20
            right-2
            left-2
            z-40
            flex
            h-[calc(100dvh-6rem)]
            max-h-[600px]
            flex-col
            overflow-hidden
            rounded-lg
            border
            border-gray-200
            bg-white
            shadow-xl

            sm:bottom-24
            sm:left-auto
            sm:right-4
            sm:h-[500px]
            sm:w-[440px]
          "
        >
          {/* Header */}
          <div className="shrink-0 border-b border-gray-100 p-4 sm:p-6">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Chatbot
            </h2>

            <p className="mt-1 text-xs leading-4 text-gray-500 sm:text-sm">
              Powered by Helio
            </p>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center">
                <div className="max-w-xs">
                  <MessageCircle className="mx-auto mb-3 h-8 w-8 text-gray-400" />

                  <p className="text-sm text-gray-500">
                    Start a conversation with the AI assistant.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((mess, i) => (
                <div
                  key={i}
                  className="my-4 flex min-w-0 gap-3 text-sm text-gray-600"
                >
                  {/* Avatar */}
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                    <span className="flex h-full w-full items-center justify-center rounded-full border bg-gray-100 p-1">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                  </span>

                  {/* Message */}
                  <div className="min-w-0 flex-1 break-words">
                    <span className="mb-1 block font-bold text-gray-700">
                      {mess.role === "human" ? "You" : "AI"}
                    </span>

                    <p className="whitespace-pre-wrap leading-relaxed">
                      {mess.content}
                    </p>
                  </div>
                </div>
              ))
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-gray-100 p-3 sm:p-4">
            <form
              onSubmit={handleSend}
              className="flex w-full items-center gap-2"
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isPending}
                placeholder="Type your message"
                className="
                  h-10
                  min-w-0
                  flex-1
                  rounded-md
                  border
                  border-gray-200
                  px-3
                  py-2
                  text-sm
                  text-gray-900
                  placeholder:text-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />

              <button
                type="submit"
                disabled={isPending || !message.trim()}
                className="
                  inline-flex
                  h-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-blue-600
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition-colors
                  hover:bg-blue-700
                  disabled:pointer-events-none
                  disabled:opacity-50
                  sm:px-4
                "
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;