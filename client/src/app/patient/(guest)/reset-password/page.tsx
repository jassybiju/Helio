import PatientResetPasswordForm from '@/src/features/patient/auth/components/PatientResetPasswordForm'
import React from 'react'

const PatientResetPasswordPage = () => {
  return (
   <div className="w-full max-w-2xl">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Reset Password
          </h1>
          <p className="text-slate-600 text-lg">
            Enter new Password
          </p>
        </div>
    <PatientResetPasswordForm/>
    </div>
    </div>  )
}

export default PatientResetPasswordPage