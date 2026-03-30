import DoctorForgetPasswordForm from '@/src/features/doctor/auth/components/DoctorForgetPasswordForm'
import React from 'react'

const ForgetPasswordPage = () => {
  return (
  <div className="w-full max-w-2xl">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Forget Password
          </h1>
          <p className="text-slate-600 text-lg">
            Enter email whose password is forgotten
          </p>
        </div>
        <DoctorForgetPasswordForm/>
        
      </div>
    </div>  )
}

export default ForgetPasswordPage