'use client'

import { Bell, ChevronDown } from 'lucide-react'
import React from 'react'

const AdminHeader = () => {
  return (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      {/* Left Section */}
      <div>
        <h2 className="text-sm text-slate-600">Welcome back,</h2>
        <h1 className="text-lg font-semibold text-slate-900">Dr. Smith</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            DS
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-900">Dr. Smith</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </header>  )
}

export default AdminHeader