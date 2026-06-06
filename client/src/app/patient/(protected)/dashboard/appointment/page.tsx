import PatientAppointmentComponent from '@/src/features/patient/dashboard/appointment/components/PatientAppointmentComponent'
import React from 'react'

const PatientAppointmentPage = () => {
  return (
       <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
        <p className="text-slate-600 mt-1">Manage and track all your appointments in real-time.</p>
      </div>
    <PatientAppointmentComponent/>
    </div>
  )
}

export default PatientAppointmentPage