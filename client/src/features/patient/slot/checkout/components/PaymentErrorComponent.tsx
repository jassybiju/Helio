"use client";

import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePatientCheckoutQuery } from "../hooks/usePatientCheckoutQuery";
import { useParams } from "next/navigation";
import { usePatientCheckoutMutation } from "../hooks/usePatientCheckoutMutation";
import usePatientVerifyPaymentMutation from "../hooks/usePatientVerifyPaymentMutation";
import { useRouter } from "next/navigation";
import { getRuntimeConfig } from "@/src/libs/config";

const PaymentErrorComponent = () => {
  const { id } = useParams();
  const router = useRouter()
  const { data } = usePatientCheckoutQuery(id as string);
  const {mutate} = usePatientCheckoutMutation(id as string)
  const  verifyPayment = usePatientVerifyPaymentMutation(id as string)
  const CONFIG = getRuntimeConfig()
  const handleRetryPayment = () => {  
    mutate("RAZORPAY", {
      onSuccess: async (response) => {
        const data = response.data as {
          key: string;
          amount: number;
          currency: "INR";
          orderId: string;
        };

        const options = {
          key: CONFIG.RazorpayURL!,
          amount: data.amount,
          currency: data.currency,
          order_id: data.orderId,

          name: "Your App",

          description: "Appointment Payment",

          handler: async function (paymentResponse: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            await verifyPayment.mutateAsync({
              razorpay_order_id: paymentResponse.razorpay_order_id,

              razorpay_payment_id: paymentResponse.razorpay_payment_id,

              razorpay_signature: paymentResponse.razorpay_signature,
            });

            router.push(`/appointments/${id}/success`);
          },
          modal: {
            ondismiss: function () {
              router.push(`/appointments/${id}/error`);
            },
          },
          prefill: {
            name: "Patient Name",
            email: "patient@email.com",
          },

          theme: {
            color: "#2563eb",
          },
        };

        const razor = new window.Razorpay(options);

        razor.open();
      },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Header */}\{/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-8">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-slate-900">
              Payment Failed
            </h1>
            <p className="text-lg text-slate-600">
              We couldn&apos;t process your payment. Please try again.
            </p>
          </div>

          {/* Red Divider */}
          <div className="h-1 bg-red-600 rounded-full"></div>

          {/* Error Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
            {/* Transaction Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-200">
              <div>
                <p className="text-sm font-semibold text-red-600 uppercase mb-2">
                  Transaction ID: #PAY-2024-8847
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  Consultation Booking
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {data?.data.doctor.name} • {data?.data.doctor.specialization}
                </p>
              </div>
              <span className="px-4 py-2 bg-red-100 text-red-700 text-xs font-bold rounded-lg uppercase">
                Failed
              </span>
            </div>

            {/* Error Information */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-red-900">
                Error Details
              </p>
              <p className="text-sm text-red-800">
                Your payment was declined by your bank. This could be due to:
              </p>
              <ul className="text-sm text-red-800 space-y-2 ml-4">
                <li>• Insufficient funds in your account</li>
                <li>• Incorrect card details or expired card</li>
                <li>• Card blocked by your bank for security reasons</li>
                <li>• Transaction limit exceeded</li>
              </ul>
            </div>

            {/* Payment Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                  Amount Attempted
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  ${data?.data.appointment.totalAmount}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                  Failed Date
                </p>
                <p className="text-lg font-semibold text-slate-900"></p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                  Appointment Date
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {new Date(
                    data?.data.appointment.startTime ?? "",
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <button onClick={handleRetryPayment} className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                <RotateCcw className="w-5 h-5" />
                Retry Payment
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition">
                💳 Change Payment Method
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <p className="text-sm font-semibold text-blue-900">
              Still having trouble?
            </p>
            <p className="text-sm text-blue-800">
              Our support team is here to help. Contact us for assistance with
              your payment.
            </p>
            <div className="flex gap-3">
              <a
                href="/support"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                Contact Support →
              </a>
              <a
                href="/help-center"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View Help Center →
              </a>
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
              Your appointment booking is still reserved. Please complete the
              payment within 5 mins to confirm your booking.
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
              <p className="text-sm text-slate-600">
                Modern healthcare for the digital age. Patient care, redesigned
                with empathy and technology.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">
                Services
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Telemedicine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Specialists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Mental Health
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Pediatrics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">
                Support
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">
                Connect
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  🌐
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  ↗️
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  ✉️
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600 text-center">
              © 2024 Helio Inc. All rights reserved. Made for the future of
              care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentErrorComponent;
