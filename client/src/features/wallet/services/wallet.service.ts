import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"


export interface ITransactionFilter {
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  type?: "CREDIT"|  "DEBIT" | undefined;
  order: "asc" | "desc";
  page: number;
  limit: number;
}

export const walletService = {
  getWallet (params : ITransactionFilter ) {
    return apiRequest('/wallet', HTTP_METHOD.GET, {}, params) as Promise<APIResponse<{transactions : unknown[],balance : number, totalCount : number, page : number, limit : number}>>
  }
}