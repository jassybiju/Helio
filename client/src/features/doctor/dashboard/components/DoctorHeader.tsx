'use client'

import UserAuthButtons from '@/src/components/UserAuthButtons'
import { Bell, ChevronDown } from 'lucide-react'
import React from 'react'

const DoctorHeader = () => {
  return (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      {/* Left Section */}
      <div>
        <h2 className="text-sm text-slate-600"></h2>
        <h1 className="text-lg font-semibold text-slate-900">Welcome back,</h1>
      </div>

      {/* Right Section */}
           <UserAuthButtons/>

    </header>  )
}

export default DoctorHeader