'use client'

import ResetPasswordForm from '@/src/features/auth/components/ResetPasswordForm'
import React from 'react'
import { authService } from '../services/auth.service'

const DoctorResetPasswordForm = () => {
  return (
    <ResetPasswordForm resetPassword={authService.resetPassword}/>
  )
}

export default DoctorResetPasswordForm