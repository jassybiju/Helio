"use client";

import { MessageCircle } from "lucide-react";
import React, { useState } from "react";

const AIChatBot = () => {
  const [openChatBot, setOpenChatBot] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-blue-600 hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={() => setOpenChatBot((prev) => !prev)}
      >
        <MessageCircle />
      </button>

      <div
        style={{
          boxShadow: " 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
          display: !openChatBot ? "none" : "block",
        }}
        className="fixed  bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
      >
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by Mendable and Vercel
          </p>
        </div>

        <div className="pr-4 h-[474px] min-w-full table">
          <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1">
                <MessageCircle />
              </div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">AI </span>Hi, how
              can I help you today?
            </p>
          </div>

          <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1">
                <MessageCircle />
              </div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">You </span>fewafef
            </p>
          </div>
          <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1">
                <MessageCircle />
              </div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">AI </span>Sorry, I
              couldn't find any information in the documentation about that.
              Expect answer to be less accurateI could not find the answer to
              this in the verified sources.
            </p>
          </div>
        </div>
        <div className="flex items-center pt-0">
          <form className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
            />
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-[#111827E6] h-10 px-4 py-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChatBot;
