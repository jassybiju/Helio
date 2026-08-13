"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { DollarSign, Tag, Lock, Wallet, CreditCard } from "lucide-react";
import { useParams } from "next/navigation";
import { usePatientCheckoutQuery } from "../hooks/usePatientCheckoutQuery";
import { useGetWalletQuery } from "@/src/features/wallet/hooks/useGetWalletQuery";
import { usePatientCheckoutMutation } from "../hooks/usePatientCheckoutMutation";
import { useRouter } from "next/navigation";
import usePatientVerifyPaymentMutation from "../hooks/usePatientVerifyPaymentMutation";
import { getRuntimeConfig } from "@/src/libs/config";
const PatientCheckoutComponent = () => {
  const { id } = useParams();
  const { data, isError } = usePatientCheckoutQuery(id as string);
  const verifyPayment = usePatientVerifyPaymentMutation(id as string);
  const { data: wallet } = useGetWalletQuery();
  const router = useRouter();
  const { mutate, isPending: isProcessing } = usePatientCheckoutMutation(
    id as string,
  );

  const [selectedPayment, setSelectedPayment] = useState<"WALLET" | "RAZORPAY">(
    "WALLET",
  );
  const [promoCode, setPromoCode] = useState("");

  const CONFIG = getRuntimeConfig()
  const handlePayment = async () => {
    if (selectedPayment === "WALLET") {
      mutate("WALLET", {
        onSuccess() {
          router.push(`/appointments/${id}/success`);
        },
      });
      return;
    }



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

  useEffect(() => {
    if (isError) {
      router.back();
    }
  }, [router, isError]);
  if (!data) {
    return null;
  }
  const checkoutData = data.data;

  return (
    <>
      <main className="min-h-screen w-full bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6 h-fit">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-slate-900" />
                <h2 className="text-lg font-bold text-slate-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4">
                {/* Doctor */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Doctor</span>
                  <span className="font-semibold text-slate-900">
                    Dr. Sarah Johnson (Cardiologist)
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Date & Time</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(
                      checkoutData.appointment.startTime,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {/* {date && new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {time} */}
                  </span>
                </div>

                {/* Consultation Type */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Type</span>
                  <span className="font-semibold text-slate-900">
                    {checkoutData.appointment.consultationType}
                    {/* {type === 'in-clinic' ? 'In-Clinic Visit' : 'Online Consultation'} */}
                  </span>
                </div>

                {/* Fees */}
                <div className="space-y-3 pb-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Consultation Fee</span>
                    <span className="font-semibold text-slate-900">
                      ₹{checkoutData.appointment.consultationFee?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Service Charge</span>
                    <span className="font-semibold text-slate-900">
                      ₹{checkoutData.appointment.platformFee?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-slate-900">Total Amount</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ₹{checkoutData.appointment.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">
                    Have a promo code?
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Apply it at the next step for discounts
                </p>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">
                Payment Method
              </h2>

              {/* Payment Options */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedPayment("WALLET")}
                  className={`flex-1 py-4 px-4 rounded-lg border-2 transition ${
                    selectedPayment === "WALLET"
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Wallet
                      className={`w-6 h-6 ${selectedPayment === "WALLET" ? "text-blue-600" : "text-slate-400"}`}
                    />
                    <span
                      className={`text-sm font-semibold ${selectedPayment === "WALLET" ? "text-blue-600" : "text-slate-600"}`}
                    >
                      WALLET
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedPayment("RAZORPAY")}
                  className={`flex-1 py-4 px-4 rounded-lg border-2 transition ${
                    selectedPayment === "RAZORPAY"
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard
                      className={`w-6 h-6 ${selectedPayment === "RAZORPAY" ? "text-blue-600" : "text-slate-400"}`}
                    />
                    <span
                      className={`text-sm font-semibold ${selectedPayment === "RAZORPAY" ? "text-blue-600" : "text-slate-600"}`}
                    >
                      RAZORPAY
                    </span>
                  </div>
                </button>
              </div>

              {/* WALLET Details */}
              {selectedPayment === "WALLET" && (
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">
                      Available Balance
                    </label>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">
                      ₹{wallet?.data.balance}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        Sufficient funds available
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">
                      Amount to be deducted:{" "}
                      <span className="font-semibold text-slate-900">
                        ₹{checkoutData.appointment.totalAmount?.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* RAZORPAY Details */}
              {/* {selectedPayment === "RAZORPAY" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="***"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="saveCard"
                      className="w-4 h-4 rounded"
                    />
                    <label
                      htmlFor="saveCard"
                      className="text-sm text-slate-600"
                    >
                      Save card information for future payments
                    </label>
                  </div>
                </div>
              )} */}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                {isProcessing
                  ? "Processing..."
                  : `Pay & Confirm Appointment (₹${data.data.appointment.totalAmount?.toFixed(2)})`}
              </button>

              {/* Security Info */}
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Secure 256-Bit SSL Encrypted Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatientCheckoutComponent;
