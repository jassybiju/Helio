import Navbar from '@/src/components/Navbar'
import React from 'react'

const DoctorLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <main className="flex items-center justify-center py-12 px-4">
        {children}
      </main>
      <footer className="text-center py-8 text-sm text-slate-500">
        © 2024 Stitch Telemedicine Inc. All rights reserved.
      </footer>
    </div>  )
}

export default DoctorLayout