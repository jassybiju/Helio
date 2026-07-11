"use client";

import { X } from "lucide-react";
import { LayoutGrid, LogOut, MessageCircle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useLogout } from "@/src/features/auth/hooks/useLogout";

const menuItems = [
  // { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "appointment", href: "/dashboard/appointment", icon: LayoutGrid },
  { label: "Lab Report", href: "/dashboard/lab-report", icon: LayoutGrid },
  { label: "Wallet", href: "/dashboard/wallet", icon: LayoutGrid },
  { label: "Chat", href: "/dashboard/chat", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const PatientSidebar = ({ open, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useLogout();
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
      fixed lg:static
      top-0 left-0
      h-screen
      w-64
      bg-white
      border-r
      border-slate-200
      flex
      flex-col
      z-50
      transform
      transition-transform
      duration-300
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
      >
        {" "}
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Image
                alt={"logo"}
                src={"/HelioLogo.svg"}
                width={25}
                height={25}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Helio</h1>
              <p className="text-xs text-slate-500">Patient</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          <div className="px-4 py-2 bg-slate-50 rounded-lg text-xs">
            <p className="text-slate-600 font-medium">Support Plan</p>
            <p className="text-slate-500">Premium Partner</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PatientSidebar;
