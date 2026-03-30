'use client'

import LoginForm from '@/src/features/auth/components/LoginForm'
import React from 'react'
import { authService } from '../services/auth.service'
import { useRouter } from 'next/navigation'

const PatientLoginForm = () => {
    const router = useRouter()
  
  const handleLogin = async ({email , password} : {email : string, password : string}) => {
    await authService.login({email, password})
    router.push('/dashboard')
  }
  return (
    <LoginForm login={handleLogin}/>
  )
}

export default PatientLoginForm