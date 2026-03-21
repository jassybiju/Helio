'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { authService } from '../services/auth.service'
import VerifyOTPForm from '@/src/features/auth/components/VerifyOTPForm'
import axios from 'axios'

const PatientVerifyOTP = ({id , expires} : {id : string, expires : string}) => {
  const router = useRouter()

  const handleVerifyOTP = async({
    id , otp
  } : {id :string, otp: string}) => {
      await authService.verify_otp({id, otp})
      router.push('/patient/dashboard')    
  }

  const hadnleResendOTP = async({
    id
  } : {id :string}) => {
    const res = await authService.resend_otp({id, }) as {data : {invalidAt : string}}
    console.log(res)
    router.replace(`/patient/verify-otp?otpId=${id}&expires=${res.data.invalidAt}`)
  }
  return (
    <VerifyOTPForm  email='' id={id} otp_invalid_at={expires} verifyOTP={handleVerifyOTP} resendOTP={hadnleResendOTP}/>
  )
}

export default PatientVerifyOTP