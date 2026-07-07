import Razorpay from "razorpay";

console.log(process.env.RAZORPAY_KEY, process.env.RAZORPAY_SECRET, 122232);
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});
