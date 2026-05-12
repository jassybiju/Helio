import { useQuery } from "@tanstack/react-query"
import { ITransactionFilter, walletService } from "../services/wallet.service"

export const useGetWalletQuery  = (params: ITransactionFilter={page : 1, limit : 10, order : 'asc'} )=>{
  return useQuery({
    queryKey : ['wallet'],
    queryFn :()=> walletService.getWallet(params),
    
  })
}