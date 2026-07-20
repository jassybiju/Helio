import { useMutation } from "@tanstack/react-query";
import { walletService } from "../services/wallet.service";
import { invalidateQuery } from "@/src/libs/queryClient";

const useAddMoneyVerifyMutation = () => {
  return useMutation({
    mutationFn: ({id ,data } : {id : string , data :{
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    } }) => walletService.verifyPayment(id, data),
    onSuccess(){
      invalidateQuery('wallet')
    }
  });
};

export default useAddMoneyVerifyMutation;
