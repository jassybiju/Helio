import DoctorAppointmentComponent from '@/src/features/doctor/dashboard/appointment/components/DoctorAppointmentComponent'
import React from 'react'

const DoctorAppointmentPage = () => {
  return (
        <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
        <p className="text-slate-600 mt-1">Manage and track all your patient appointments in real-time.</p>
      </div>
    <DoctorAppointmentComponent/>
     </div>
  )
}

export default DoctorAppointmentPage