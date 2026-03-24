'use client'

import LoginForm from '@/src/features/auth/components/LoginForm'
import React from 'react'
import { authService } from '../services/auth.service'

const PatientLoginForm = () => {
  const handleLogin = async ({email , password} : {email : string, password : string}) => {
    await authService.login({email, password})
  }
  return (
    <LoginForm login={handleLogin}/>
  )
}

export default PatientLoginForm