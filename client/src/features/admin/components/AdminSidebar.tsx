"use client";

import {
  DollarSign,
  LayoutGrid,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useLogout } from "../../auth/hooks/useLogout";
import Image from "next/image";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Doctors", href: "/doctor", icon: Stethoscope },
  { label: "Specialty", href: "/specialty", icon: DollarSign },
  { label: "Revenue", href: "/revenue", icon: DollarSign },
  { label: "Settings", href: "/settings", icon: Settings },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout } = useLogout();
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Image alt={"logo"} src={"/HelioLogo.svg"} width={25} height={25} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Helio</h1>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
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
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-sm">
          <LogOut className="w-5 h-5" />
          <span onClick={logout}>Logout</span>
        </button>
        <div className="px-4 py-2 bg-slate-50 rounded-lg text-xs">
          <p className="text-slate-600 font-medium">Support Plan</p>
          <p className="text-slate-500">Premium Partner</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
