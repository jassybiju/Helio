"use client";

import Link from "next/link";
import React, { useState } from "react";
import ClayButton from "./ui/ClayButton";
import { useLogout } from "../features/auth/hooks/useLogout";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Bell, ChevronDown, UserIcon } from "lucide-react";
import { USER_ROLES } from "../types/user.types";
import { NotificationComponent } from "./NotificationComponent";

const UserAuthButtons = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const data = useAuth();
  const { logout } = useLogout();
  if (data.isLoading && !data.user) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {data?.user?.email ? (
        <>
          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <NotificationComponent
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-slate-100 sm:px-3"
            >
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-white sm:h-9 sm:w-9">
                {data.user?.profilePic ? (
                  <img
                    src={data.user?.profilePic}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-5 w-5" />
                )}
              </div>

              {/* Hidden on mobile */}
              <span className="hidden lg:block max-w-28 truncate text-sm font-medium text-slate-900">
                {data.user.email}
              </span>

              <ChevronDown className="hidden sm:block h-4 w-4 text-slate-600" />
            </button>
            {isDropdownOpen && (
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
      sm:w-56

      overflow-hidden
      rounded-xl
      border
      border-slate-200
      bg-white
      shadow-xl

      [&>a]:border-slate-300
    "
              >
                <Link
                  href="/"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 hover:bg-slate-100  border-b"
                >
                  Home
                </Link>

                {data.user.role === USER_ROLES.DOCTOR && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-3 hover:bg-slate-100 border-b"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/dashboard/appointment"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 hover:bg-slate-100 border-b"
                >
                  Appointments
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 hover:bg-slate-100 border-b"
                >
                  Settings
                </Link>

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-slate-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <ClayButton variant="primary" size="sm">
              Login
            </ClayButton>
          </Link>

          <Link href="/register" className="hidden sm:block">
            <ClayButton variant="secondary" size="sm">
              Sign Up
            </ClayButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAuthButtons;
