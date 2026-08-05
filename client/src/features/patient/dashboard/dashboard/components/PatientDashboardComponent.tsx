'use client'

import { Calendar, CheckCircle, AlertCircle, TrendingUp, Pill, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface VitalStatus {
  status: 'normal' | 'warning' | 'critical'
}

const getVitalStatus = (value: number, name: string): VitalStatus => {
  // Heart rate: 60-100 bpm normal
  if (name === 'heart_rate') {
    if (value >= 60 && value <= 100) return { status: 'normal' }
    return { status: 'critical' }
  }
  // Blood pressure systolic: < 120 normal, 120-129 elevated, > 130 high
  if (name === 'blood_pressure') {
    if (value < 120) return { status: 'normal' }
    if (value < 130) return { status: 'warning' }
    return { status: 'critical' }
  }
  // Oxygen: 95-100 normal
  if (name === 'oxygen') {
    if (value >= 95) return { status: 'normal' }
    return { status: 'critical' }
  }
  // Temperature: 36.5-37.5 normal
  if (name === 'temperature') {
    if (value >= 36.5 && value <= 37.5) return { status: 'normal' }
    return { status: 'critical' }
  }
  return { status: 'normal' }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal':
      return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-600' }
    case 'warning':
      return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: 'text-yellow-600' }
    case 'critical':
      return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-600' }
    default:
      return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', icon: 'text-slate-600' }
  }
}

export default function PatientDashboardComponent() {
  const nextVisit = {
    date: '2024-04-15',
    time: '10:30 AM',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    appointmentId: '1',
  }

  const activeMedications = [
    { 
      id: '1',
      name: 'Lisinopril', 
      dosage: '10mg', 
      frequency: 'Once daily', 
      status: 'Active',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: '2024-03-10',
      appointmentId: '3',
      reason: 'Blood pressure management'
    },
    { 
      id: '2',
      name: 'Metformin', 
      dosage: '500mg', 
      frequency: 'Twice daily', 
      status: 'Active',
      prescribedBy: 'Dr. Emily Rodriguez',
      prescribedDate: '2024-03-10',
      appointmentId: '3',
      reason: 'Diabetes management'
    },
    { 
      id: '3',
      name: 'Aspirin', 
      dosage: '81mg', 
      frequency: 'Once daily', 
      status: 'Active',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: '2024-03-20',
      appointmentId: '1',
      reason: 'Cardiovascular health'
    },
  ]

  const vitals = [
    { label: 'Heart Rate', value: 72, unit: 'bpm', name: 'heart_rate' },
    { label: 'Blood Pressure', value: 118, unit: 'mmHg', name: 'blood_pressure' },
    { label: 'Oxygen Saturation', value: 98, unit: '%', name: 'oxygen' },
    { label: 'Temperature', value: 37.1, unit: '°C', name: 'temperature' },
  ]

  // Group medications by doctor
  const medicationsByDoctor = activeMedications.reduce((acc, med) => {
    if (!acc[med.prescribedBy]) {
      acc[med.prescribedBy] = []
    }
    acc[med.prescribedBy].push(med)
    return acc
  }, {} as Record<string, typeof activeMedications>)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Good morning, Alex</h1>
        <p className="text-slate-600">Here&apos;s what&apos;s happening with your health today.</p>
      </div>

      {/* Next Visit - Prominent Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Next Visit
            </h2>
            <p className="text-blue-100">You have an upcoming appointment scheduled</p>
            <div className="space-y-2 mt-4">
              <p className="text-sm"><span className="font-semibold">Date:</span> {nextVisit.date} at {nextVisit.time}</p>
              <p className="text-sm"><span className="font-semibold">Doctor:</span> {nextVisit.doctor} - {nextVisit.specialty}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            Reschedule
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">Total Appointments</h3>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">6</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">Completed</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">3</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">Cancelled/No Show</h3>
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">3</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-600 uppercase">Upcoming</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
        </div>
      </div>

      {/* Vitals with Status Indicators */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Vitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {vitals.map((vital) => {
            const vitalStatus = getVitalStatus(vital.value, vital.name)
            const colors = getStatusColor(vitalStatus.status)
            return (
              <div key={vital.name} className={`rounded-lg border ${colors.bg} ${colors.border} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-slate-600 uppercase">{vital.label}</p>
                  {vitalStatus.status === 'critical' ? (
                    <AlertTriangle className={`w-5 h-5 ${colors.icon}`} />
                  ) : (
                    <CheckCircle className={`w-5 h-5 ${colors.icon}`} />
                  )}
                </div>
                <p className={`text-3xl font-bold ${colors.text}`}>
                  {vital.value} <span className="text-sm text-slate-500">{vital.unit}</span>
                </p>
                <p className={`text-xs mt-2 ${colors.text} font-semibold`}>
                  {vitalStatus.status === 'normal' ? 'In Range' : vitalStatus.status === 'warning' ? 'Elevated' : 'Out of Range'}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Medications Grouped by Doctor */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <Pill className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Active Medications</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {Object.entries(medicationsByDoctor).map(([doctor, meds]) => (
            <div key={doctor} className="p-4">
              {/* Doctor Header */}
              <p className="text-sm font-semibold text-slate-700 mb-3">{doctor}</p>
              
              {/* Medications List */}
              <div className="space-y-2">
                {meds.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900 text-sm">{med.name}</p>
                        <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded">{med.dosage}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{med.frequency} • {med.reason}</p>
                    </div>
                    <Link 
                      href={`/patient/dashboard/appointments`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xs whitespace-nowrap ml-3"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-200">
          <Link href="/patient/dashboard/appointments" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            View All Medications & Appointments →
          </Link>
        </div>
      </div>



      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link href="/patient/doctors" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
          Book a Doctor
        </Link>
        <Link href="/patient/dashboard/appointments" className="px-6 py-3 border-2 border-slate-200 text-slate-900 font-medium rounded-lg hover:bg-slate-50">
          View Appointments
        </Link>
      </div>
    </div>
  )
}
