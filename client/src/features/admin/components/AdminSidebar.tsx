'use client'

import { DollarSign, LayoutGrid, LogOut, Settings, Stethoscope, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useLogout } from '../../auth/hooks/useLogout'

const menuItems = [
  { label: 'Dashboard', href: '/', icon: LayoutGrid },
  { label: 'Patients', href: '/patients', icon: Users },
  { label: 'Doctors', href: '/doctor', icon: Stethoscope },
  { label: 'Revenue', href: '/revenue', icon: DollarSign },
  { label: 'Settings', href: '/settings', icon: Settings },
]

const AdminSidebar = () => {
    const pathname = usePathname()
    const {logout} = useLogout()
  return (
   <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
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
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
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
  )
}

export default AdminSidebar