'use client'

import ForgetPasswordForm from '@/src/features/auth/components/ForgetPasswordForm'
import React from 'react'
import { authService } from '../services/auth.service'

const DoctorForgetPasswordForm = () => {
  return (
    <ForgetPasswordForm forgetPassword={authService.forgetPassword} />
  )
}

export default DoctorForgetPasswordForm