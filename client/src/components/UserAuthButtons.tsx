"use client";

import Link from "next/link";
import React, { useState } from "react";
import ClayButton from "./ui/ClayButton";
import { useLogout } from "../features/auth/hooks/useLogout";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Bell, ChevronDown } from "lucide-react";

const UserAuthButtons = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const data = useAuth();
  const { logout } = useLogout();
  if (data.isLoading && !data.user) {
    return null;
  }
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        {data?.user?.email ? (
          <>
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {data?.user.email.charAt(0)}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-slate-900">
                  {data.user.email.split(" ")[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-200 shadow-lg">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-t-lg border-b border-slate-100"
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/appointments"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Appointments
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 rounded-b-lg border-t border-slate-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <ClayButton variant="primary" size="md">
                Login
              </ClayButton>
            </Link>

            <Link href={"/register"}>
              <ClayButton variant="secondary" size="md">
                Sign Up
              </ClayButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserAuthButtons;
