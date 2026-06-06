import { useMutation } from "@tanstack/react-query";
import { appointmentService } from "../../../services/appointment.service";

const usePatientVerifyPaymentMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => appointmentService.verifyPayment(id, data),
  });
};

export default usePatientVerifyPaymentMutation;
