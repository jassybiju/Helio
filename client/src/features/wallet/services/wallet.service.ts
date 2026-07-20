import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";

export interface ITransactionFilter {
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  type?: "CREDIT" | "DEBIT" | undefined | null;
  order: "asc" | "desc";
  page: number;
  limit: number;
}

export const walletService = {
  getWallet(params: ITransactionFilter) {
    return apiRequest("/wallet", HTTP_METHOD.GET, {}, params) as Promise<
      APIResponse<{
        transactions: {
          id: string;
          amount: number;
          type: string;
          date: string;
          status : string
          description : string
        }[];
        balance: number;
        totalCount: number;
        page: number;
        limit: number;
      }>
    >;
  },

  addMoney(money: number) {
    return apiRequest("/wallet", HTTP_METHOD.POST, { amount: money });
  },
  verifyPayment(
    id: string,
    data: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
  ) {
    return apiRequest(`/wallet/${id}`, HTTP_METHOD.POST, data);
  },
};
