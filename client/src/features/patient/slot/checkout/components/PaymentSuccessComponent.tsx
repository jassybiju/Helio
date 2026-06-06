'use client'

import Link from 'next/link'
import { CheckCircle, Download, ArrowLeft } from 'lucide-react'
import { usePatientCheckoutQuery } from '../hooks/usePatientCheckoutQuery'
import { useParams } from 'next/navigation'
import React from 'react'

const PaymentSuccessComponent = () => {
  const {id} = useParams()
  const {data} = usePatientCheckoutQuery(id as string)

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-slate-900">Payment Successful!</h1>
            <p className="text-lg text-slate-600">Your payment has been processed and confirmed.</p>
          </div>

          {/* Blue Divider */}
          <div className="h-1 bg-blue-600 rounded-full"></div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
            {/* Transaction Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-200">
              <div>
                {/* <p className="text-sm font-semibold text-blue-600 uppercase mb-2">Transaction ID: #PAY-2024-8847</p> */}
                <h2 className="text-2xl font-bold text-slate-900">Consultation Booking</h2>
                <p className="text-sm text-slate-600 mt-1">{data?.data.doctor.name} • {data?.data.doctor.specialization}</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-700 text-xs font-bold rounded-lg uppercase">
                Completed
              </span>
            </div>

            {/* Payment Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Amount Paid</p>
                <p className="text-3xl font-bold text-slate-900">${data?.data.appointment.totalAmount}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Payment Date</p>
                <p className="text-lg font-semibold text-slate-900">{new Date(data?.data.createdAt).toLocaleString()}</p>
              </div>
              {/* <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Payment Method</p>
                <p className="text-lg font-semibold text-slate-900">Credit Card (Visa ending in 4242)</p>
              </div> */}
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Appointment Date</p>
                <p className="text-lg font-semibold text-slate-900">{new Date(data?.data.appointment.startTime ?? '').toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition">
                📅 Add to Calendar
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-4">
            <Link
              href="/patient/dashboard"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Link>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              A confirmation email has been sent to your registered email address with all payment details and appointment information.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-4">Helio</p>
              <p className="text-sm text-slate-600">Modern healthcare for the digital age. Patient care, redesigned with empathy and technology.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">Services</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Telemedicine</a></li>
                <li><a href="#" className="hover:text-slate-900">Specialists</a></li>
                <li><a href="#" className="hover:text-slate-900">Mental Health</a></li>
                <li><a href="#" className="hover:text-slate-900">Pediatrics</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">Support</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">Connect</p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-600 hover:text-slate-900">🌐</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">↗️</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">✉️</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600 text-center">© 2024 Helio Inc. All rights reserved. Made for the future of care.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PaymentSuccessComponent