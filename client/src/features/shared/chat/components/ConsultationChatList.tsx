"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { ChatListType } from "../types/chat.type";

interface Chat {
  id: string;
  doctorName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  status: "active" | "expired";
  daysRemaining?: string;
}

interface Props {
  activeId: string | null;
  baseUrl: string;
  list: ChatListType;
  setActiveId: (id: string) => void;
}

export default function ConsultationChatList({
  activeId,
  list,
  baseUrl,
  setActiveId,
}: Props) {
  const [tab, setTab] = useState<"active" | "expired">("active");

  const chatList = tab === 'active' ? list?.chats.active : list?.chats.expired
  // const filtered = chats.filter((chat) => chat.status === tab);

  return (
    <div className="w-[340px] border-r border-slate-200 bg-white flex flex-col">
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">
            Consultation Messages
          </h2>
        </div>
      </div>

      <div className="border-b border-slate-200 p-3">
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setTab("active")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              tab === "active"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setTab("expired")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              tab === "expired"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600"
            }`}
          >
            Expired
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatList?.map((chat) => {
          const selected = chat.id === activeId;

          return (
            <button className="w-full" key={chat.id} onClick={() => setActiveId(chat.id)}>
              <div
                className={`border-b border-slate-100 px-4 py-4 transition ${
                  selected
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex gap-3">
                  <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                    {chat.profilePic ? <img src={chat.profilePic}/> : chat.name[0]}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {chat.name}
                      </h3>

                      <span className="text-xs text-slate-400">
                        {/* {chat.lastMessageAt} */}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {chat.message}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {chat.expiresIn ? (
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                          {chat.expiresIn} {tab === 'active' ? 'left' : "before"}
                        </span>
                      ) : (
                        <span />
                      )}

                      {/* {chat.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] text-white">
                          {chat.unreadCount}
                        </span> */}
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
