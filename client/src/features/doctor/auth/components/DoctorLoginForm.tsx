'use client'

import LoginForm from '@/src/features/auth/components/LoginForm'
import React from 'react'
import { authService } from '../services/auth.service'
import { useRouter } from 'next/navigation'
import { CredentialResponse } from '@react-oauth/google'
import { GoogleLoginFn } from '@/src/features/auth/types/auth.types'
import { invalidateQuery } from '@/src/libs/queryClient'


const DoctorLoginForm = () => {
  const router = useRouter()
  const handleLogin = async ({email, password} : {email : string, password : string}) => {
    await authService.login({email, password})
    router.replace('/')
  }

  const handleGoogleLogin : GoogleLoginFn = async (credential : string) => {
   const response =  await authService.googleLogin({credential : credential!})
    invalidateQuery('me')
   if(!response.data.isProfileComplete){
    router.replace('/profile-complete')
   }else {
    router.replace('/')
   }
  }
  return (
    <LoginForm login={handleLogin} googleLogin={handleGoogleLogin}/>
  )
}

export default DoctorLoginForm