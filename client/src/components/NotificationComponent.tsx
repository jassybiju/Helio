"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Trash2,
} from "lucide-react";
import { useGetAllNotificationQuery } from "../hooks/useGetAllNotificationQuery";

interface Notification {
  id: string;
  type: "appointment" | "message" | "alert" | "reminder";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  icon?: "check" | "alert" | "info" | "clock";
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationComponent({
  isOpen,
  onClose,
}: NotificationDropdownProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllNotificationQuery();

  const notifications =
    data?.pages.flatMap((page) => page.data.notifications) ?? [];

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
      },
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isOpen]);
  // const handleMarkAsRead = (id: string) => {
  //   setNotifications(
  //     notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
  //   );
  // };

  // const handleDeleteNotification = (id: string) => {
  //   setDeletingId(id);
  //   setTimeout(() => {
  //     setNotifications(notifications.filter((n) => n.id !== id));
  //     setDeletingId(null);
  //   }, 300);
  // };

  // const handleClearAll = () => {
  //   setNotifications([]);
  // };

  const getIconComponent = (notification: Notification) => {
    switch (notification.icon) {
      case "check":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "clock":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (isRead: boolean) => {
    return "bg-white";
  };

  if (!isOpen) return null;

  return (
    <div
      className="
    fixed
    top-16
    left-2
    right-2
    z-50

    sm:absolute
    sm:top-full
    sm:right-0
    sm:left-auto
    sm:mt-2
    sm:w-96

    bg-white
    rounded-xl
    border
    border-gray-200
    shadow-xl
    max-h-[80vh]
    overflow-hidden
    flex
    flex-col
  "
    >
      {" "}
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      {/* Notifications List */}
      <div className="overflow-y-auto flex-1" ref={scrollRef}>
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-gray-400 text-sm">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`transition-all ${
                  deletingId === notification.id
                    ? "opacity-0 translate-x-full"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <div
                  // onClick={() => handleMarkAsRead(notification.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${getBackgroundColor(notification.isRead)}`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getIconComponent(notification)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`text-sm font-semibold truncate ${
                            notification.isRead
                              ? "text-gray-700"
                              : "text-gray-900"
                          }`}
                        >
                          {notification.heading}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>

                    {/* Delete Button */}
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleDeleteNotification(notification.id);
                      }}
                      className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={bottomRef} className="h-5" />

        {isFetchingNextPage && (
          <div className="p-3 text-center">Loading...</div>
        )}
      </div>
      {/* Footer */}
      {/* {notifications.length > 0 && (
        <div className="border-t border-gray-200 p-3 bg-gray-50 flex gap-2">
          <button
            // onClick={handleClearAll}
            className="flex-1 text-sm font-medium text-gray-600 hover:text-gray-900 py-2 px-3 hover:bg-gray-200 rounded transition-colors"
          >
            Clear All
          </button>
          <a
            href="#"
            className="flex-1 text-sm font-medium text-blue-600 hover:text-blue-700 py-2 px-3 hover:bg-blue-50 rounded transition-colors text-center"
          >
            View All
          </a>
        </div>
      )} */}
    </div>
  );
}
