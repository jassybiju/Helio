import ClayButton from "@/src/components/ui/ClayButton";
import Input from "@/src/components/ui/Input";
import { ModalProps } from "@/src/layout/ModalProvider";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useAddMoneyMutation } from "../hooks/useAddMoneyMutation";
import useAddMoneyVerifyMutation from "../hooks/useAddMoneyVerifyMutation";
import { toast } from "react-toastify";

const AddMoneyModal = ({ close }: ModalProps) => {
  const { mutate: addMoney } = useAddMoneyMutation();
  const verifyPayment = useAddMoneyVerifyMutation();
  const [amount, setAmount] = useState<string>('');

  const handleAddAmount = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePayment = async () => {
      const paymentAmount = Number(amount);

  if (!paymentAmount || paymentAmount <= 0) {
    toast.error("Please enter a valid amount");
    return;
  }
    addMoney(paymentAmount, {
      onSuccess: async (response) => {
        const data = response.data as {
          key: string;
          amount: number;
          currency: "INR";
          orderId: string;
          transactionId: string;
        };

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
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
              id: data.transactionId,
              data: {
                razorpay_order_id: paymentResponse.razorpay_order_id,

                razorpay_payment_id: paymentResponse.razorpay_payment_id,

                razorpay_signature: paymentResponse.razorpay_signature,
              },
            });

            toast.success("Payment Successful");
          },
          modal: {
            ondismiss: function () {
              toast.success("Payment Failed");
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
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 ">
        <h2 className="text-base font-semibold text-slate-900">
          {"Add Money"}
        </h2>
        <button
          onClick={close}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="p-10 ">
        <label className="text-black" htmlFor="">
          Enter Amount to Add{" "}
        </label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => handleAddAmount(e.target.value)}
        />
        <ClayButton className="m-3" onClick={handlePayment}>
          Add money
        </ClayButton>
      </div>
    </div>
  );
};

export default AddMoneyModal;
