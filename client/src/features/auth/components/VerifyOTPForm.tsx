'use client'

import React from 'react'
import { useOTPVerification } from '../hooks/useOTPVerification'
import ClayButton from '@/src/components/ui/ClayButton'
import OTPInput from './OTPInput'

type Props = {
  email : string,
  id : string,
  otp_invalid_at : string,
  verifyOTP : ({id ,otp} : {id : string,otp : string})=>Promise<unknown>,
  resendOTP: ({id } : {id : string})=>Promise<unknown>,
}

const VerifyOTPForm = ({email ,id, otp_invalid_at, verifyOTP, resendOTP} : Props) => {
  const {setValue, otpValue, otpFormSubmit, submitError,otpVerifySubmitting, submitSuccess, onSubmit, handleResendOTP,isResending,secondsRemaining, isExpired, formatTimeRemaining, errors,} = useOTPVerification(id, otp_invalid_at, verifyOTP, resendOTP)
  console.log(secondsRemaining)
  return (
  <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
           
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">Verify Identity</h1>
        <p className="text-center text-slate-600 mb-6">
          We've sent a verification code to your email.
          <br />
          Please enter the 6-digit code below to continue.
        </p>

        {/* Timer */}
        <div className="flex justify-center mb-6">
          <div className={`px-4 py-2 rounded-lg font-mono font-semibold text-lg ${
            isExpired 
              ? 'bg-red-50 text-red-600' 
              : secondsRemaining < 60
              ? 'bg-yellow-50 text-yellow-600'
              : 'bg-blue-50 text-blue-600'
          }`}>
            {isExpired ? 'Code Expired' : `Code expires in ${formatTimeRemaining(secondsRemaining)}`}
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium text-center">OTP verified successfully!</p>
          </div>
        )}

        {/* Resend Success Message */}
        {/* {resendSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium text-center">OTP resent to your email</p>
          </div>
        )} */}

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium text-center">{submitError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={otpFormSubmit} className="space-y-8">
          {/* OTP Input */}
          <div>
            <OTPInput value={otpValue} onChange={(val) => setValue('otp', val)} length={6} />
            {errors.otp && (
              <p className="text-red-600 text-sm mt-2 text-center">{errors.otp.message}</p>
            )}
          </div>

          {/* Verify Button */}
          <div>
            <ClayButton
              variant="primary"
              size="lg"
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={otpVerifySubmitting || otpValue.length !== 6 || isExpired}
            >
              {isExpired ? 'Code Expired' : otpVerifySubmitting ? 'Verifying...' : 'Verify & Continue'}
              {!otpVerifySubmitting && !isExpired && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </ClayButton>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="text-slate-500 text-sm">Didn't receive code?</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Links */}
        <div className="space-y-3 text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending }
            className={`font-medium text-sm transition-colors ${
              secondsRemaining > 30
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-700'
            }`}
            title={secondsRemaining > 30 ? `Can resend in ${secondsRemaining - 30} seconds` : ''}
          >
            {isResending ? 'Resending...' : 'Resend Code'}
          </button>
         
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8 uppercase tracking-wide">
          Secure Onboarding Powered By Helio
        </p>
      </div>
    </div>  )
}

export default VerifyOTPForm