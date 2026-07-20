interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;

  name?: string;
  description?: string;

  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}


export {}