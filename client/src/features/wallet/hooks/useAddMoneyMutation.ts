import { useMutation } from "@tanstack/react-query"
import { walletService } from "../services/wallet.service"
import { invalidateQuery } from "@/src/libs/queryClient"
import { toast } from "react-toastify"

export const useAddMoneyMutation=() => {
  return useMutation({
    mutationFn : walletService.addMoney,
    onSuccess(){
      invalidateQuery('wallet')
      toast.success("Amount Added Succesfully")
    }
  })
}